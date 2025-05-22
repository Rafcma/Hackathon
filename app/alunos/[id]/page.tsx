"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getAlunos } from "@/lib/data-client"
import { explicarResultadoIA } from "@/lib/ia"
import IndicadorRisco from "@/components/indicador-risco"
import { formatarData } from "@/lib/utils"
import type { Aluno, LogAluno } from "@/lib/types"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DetalhesAluno({ params }: { params: { id: string } }) {
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

        // Obter todos os alunos
        const alunos = await getAlunos()
        const alunoEncontrado = alunos.find((a) => a.id === Number.parseInt(params.id))

        if (!alunoEncontrado) {
          setErro("Aluno não encontrado")
          return
        }

        setAluno(alunoEncontrado)

        // Obter logs do aluno
        const resposta = await fetch(`/api/alunos/${params.id}/logs`)
        if (!resposta.ok) {
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
  }, [params.id])

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] flex-grow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
          <span className="ml-3 text-gray-600">Carregando dados...</span>
        </div>
        <Footer />
      </div>
    )
  }

  if (erro || !aluno) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-grow">
          <div className="card p-8 max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 font-cinzel">Erro</h1>
            <p className="text-gray-600 mb-6">{erro || "Aluno não encontrado"}</p>
            <button onClick={() => router.push("/")} className="btn btn-primary">
              Voltar para a página inicial
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const explicacao = explicarResultadoIA(aluno)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex justify-between items-center mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-purple-800 hover:text-purple-900 transition-colors"
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
              <div className="bg-purple-50 px-3 py-1 rounded-full text-purple-800 text-sm font-medium">
                ID: {aluno.id}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 font-cinzel">{aluno.nome}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Informações Pessoais</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
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
                <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2">
                      <IndicadorRisco nivel={aluno.riscoEvasao} />
                    </div>
                    <p className="text-sm text-gray-500">
                      Baseado em análise de múltiplos fatores de engajamento do aluno
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Presença</h3>
                <div className="text-3xl font-bold text-purple-800">{aluno.presenca}%</div>
                <div className="text-sm text-gray-500 mt-1">Frequência nas aulas</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Média de Notas</h3>
                <div className="text-3xl font-bold text-purple-800">{aluno.notas.toFixed(1)}</div>
                <div className="text-sm text-gray-500 mt-1">Escala de 0 a 10</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Acessos à Plataforma</h3>
                <div className="text-3xl font-bold text-purple-800">{aluno.acessos}</div>
                <div className="text-sm text-gray-500 mt-1">Últimos 30 dias</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Participação em Fóruns</h3>
                <div className="text-3xl font-bold text-purple-800">{aluno.participacaoForuns}</div>
                <div className="text-sm text-gray-500 mt-1">Interações em discussões</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-medium text-gray-800 mb-2 font-cinzel">Atividades Concluídas</h3>
                <div className="text-3xl font-bold text-purple-800">{aluno.atividadesConcluidas}</div>
                <div className="text-sm text-gray-500 mt-1">De um total de 6 atividades</div>
              </div>
            </div>

            <div className="mt-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Análise da IA</h2>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <p className="text-gray-700">{explicacao}</p>
              </div>
            </div>

            <div className="mt-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Logs de Acesso</h2>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {logs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
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
                      <tbody className="bg-white divide-y divide-gray-200">
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
              <div className="bg-gray-50 p-6 rounded-lg">
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
