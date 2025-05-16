"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import IndicadorRisco from "@/components/indicador-risco"
import type { Aluno } from "@/lib/types"

export default function PesquisaAlunos() {
  const [termoBusca, setTermoBusca] = useState("")
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const router = useRouter()

  const buscarAlunos = async () => {
    if (!termoBusca.trim()) {
      setMensagem("Digite um nome para pesquisar")
      setAlunos([])
      return
    }

    try {
      setCarregando(true)
      setMensagem("")

      const resposta = await fetch(`/api/alunos/buscar?termo=${encodeURIComponent(termoBusca)}`)

      if (!resposta.ok) {
        throw new Error(`Erro na busca: ${resposta.status}`)
      }

      const dados = await resposta.json()
      setAlunos(dados)

      if (dados.length === 0) {
        setMensagem("Nenhum aluno encontrado com esse nome")
      }
    } catch (erro) {
      console.error("Erro ao buscar alunos:", erro)
      setMensagem("Erro ao buscar alunos. Tente novamente.")
      setAlunos([])
    } finally {
      setCarregando(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      buscarAlunos()
    }
  }

  const verDetalhes = (id: number) => {
    router.push(`/alunos/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="bg-[#efece3] rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 font-cinzel">Pesquisar Alunos</h1>

          <div className="flex mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar aluno por nome"
                className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#efece3]"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={carregando}
              />
            </div>
            <button
              className={`btn-3d btn-3d-primary py-3 px-6 rounded-r-md font-medium ${
                carregando ? "btn-3d-disabled" : ""
              }`}
              onClick={buscarAlunos}
              disabled={carregando}
            >
              {carregando ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Buscando...</span>
                </div>
              ) : (
                <span>Buscar</span>
              )}
            </button>
          </div>

          {mensagem && <div className="text-center py-4 text-gray-500">{mensagem}</div>}

          {alunos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Lista de alunos matriculados</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Aluno
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Curso
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Período
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status do aluno
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#efece3] divide-y divide-gray-200">
                    {alunos.map((aluno) => (
                      <tr key={aluno.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{aluno.nome}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{aluno.curso}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{aluno.modulo.replace("Módulo ", "")}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <IndicadorRisco nivel={aluno.riscoEvasao} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => verDetalhes(aluno.id)}
                            className="btn-3d py-1 px-3 rounded-md text-blue-600 hover:text-blue-900 font-medium transition-colors"
                          >
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
