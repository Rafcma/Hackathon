"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getAlunos } from "@/lib/data-client"
import { explicarResultadoIA } from "@/lib/ia"
import IndicadorRisco from "@/components/indicador-risco"
import { formatarData } from "@/lib/utils"
import type { Aluno, LogAluno } from "@/lib/types"
import Navbar from "@/components/navbar"

export default function DetalhesAluno({ params }: { params: { id: string } }) {
  const id = use(Promise.resolve(params.id))

  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [logs, setLogs] = useState<LogAluno[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true)
        setErro(null)

        const alunos = await getAlunos()
        const alunoEncontrado = alunos.find((a) => a.id === Number.parseInt(id))

        if (!alunoEncontrado) {
          setErro("Aluno não encontrado")
          return
        }

        setAluno(alunoEncontrado)

        const resposta = await fetch(`/api/alunos/${id}/logs`)
        if (!resposta.ok) {
          const textoErro = await resposta.text()
          console.error(`Erro ao obter logs (${resposta.status}): ${textoErro}`)
          throw new Error(`Erro ao obter logs: ${resposta.status}`)
        }

        const logsData = await resposta.json()
        setLogs(logsData)
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error)
        setErro("Erro ao carregar dados do aluno")
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [id])

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Carregando dados...</span>
        </div>
      </div>
    )
  }

  if (erro || !aluno) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-[#efece3] rounded-lg shadow-sm p-8 max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 font-cinzel">Erro</h1>
            <p className="text-gray-600 mb-6">{erro || "Aluno não encontrado"}</p>
            <button onClick={() => router.push("/")} className="btn-3d btn-3d-primary py-2 px-4 rounded-md font-medium">
              Voltar para a página inicial
            </button>
          </div>
        </div>
      </div>
    )
  }

  const explicacao = explicarResultadoIA(aluno)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="bg-[#efece3] rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/"
              className="btn-3d py-2 px-4 rounded-md text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Voltar para a lista
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 font-cinzel">Detalhes do Aluno</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Informações Pessoais</h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-medium">Nome:</span> {aluno.nome}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Curso:</span> {aluno.curso}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Módulo:</span> {aluno.modulo}
                </p>
                {aluno.ultimoAcesso && (
                  <p className="text-gray-700">
                    <span className="font-medium">Último acesso:</span> {formatarData(aluno.ultimoAcesso)}
                  </p>
                )}
                {aluno.userId && (
                  <p className="text-gray-700">
                    <span className="font-medium">ID do usuário:</span> {aluno.userId}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Risco de Evasão</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <IndicadorRisco nivel={aluno.riscoEvasao} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Presença</h3>
              <div className="text-2xl font-bold">{aluno.presenca}%</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Média de Notas</h3>
              <div className="text-2xl font-bold">{aluno.notas.toFixed(1)}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Acessos à Plataforma</h3>
              <div className="text-2xl font-bold">{aluno.acessos}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Participação em Fóruns</h3>
              <div className="text-2xl font-bold">{aluno.participacaoForuns}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Atividades Concluídas</h3>
              <div className="text-2xl font-bold">{aluno.atividadesConcluidas}</div>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Análise da IA</h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{explicacao}</p>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Logs de Acesso</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {logs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ação
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Alvo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Curso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#efece3] divide-y divide-gray-200">
                      {logs.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatarData(log.data)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.acao}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.alvo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.curso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">Nenhum log de acesso disponível para este aluno.</div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Ações Recomendadas</h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              {aluno.riscoEvasao === "alto" && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Agendar reunião individual com o aluno</li>
                  <li>Oferecer tutoria personalizada</li>
                  <li>Verificar necessidade de apoio psicopedagógico</li>
                  <li>Enviar material de reforço para as disciplinas com baixo desempenho</li>
                </ul>
              )}

              {aluno.riscoEvasao === "medio" && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Enviar mensagem de acompanhamento</li>
                  <li>Sugerir participação em grupos de estudo</li>
                  <li>Oferecer material complementar</li>
                </ul>
              )}

              {aluno.riscoEvasao === "baixo" && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Manter acompanhamento regular</li>
                  <li>Incentivar participação em atividades extracurriculares</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
