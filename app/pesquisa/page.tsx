"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import IndicadorRisco from "@/components/indicador-risco"
import type { Aluno } from "@/lib/types"

export default function PesquisaAlunos() {
  const [termoBusca, setTermoBusca] = useState("")
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const router = useRouter()

  // #region Busca de alunos
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
  // #endregion

  // #region Manipuladores de eventos
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      buscarAlunos()
    }
  }

  const verDetalhes = (id: number) => {
    router.push(`/alunos/${id}`)
  }
  // #endregion

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="card animate-fade-in">
          <div className="card-header">
            <h1 className="text-2xl font-bold text-gray-800 font-cinzel">Pesquisar Alunos</h1>
          </div>
          <div className="card-body">
            <div className="mb-8">
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Aluno
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    id="busca"
                    type="text"
                    placeholder="Digite o nome do aluno para pesquisar"
                    className="input rounded-r-none"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={carregando}
                  />
                </div>
                <button
                  className={`btn btn-primary rounded-l-none ${carregando ? "btn-disabled" : ""}`}
                  onClick={buscarAlunos}
                  disabled={carregando}
                >
                  {carregando ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Buscando...
                    </>
                  ) : (
                    "Buscar"
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Digite o nome completo ou parte do nome do aluno que deseja encontrar.
              </p>
            </div>

            {mensagem && (
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <p className="text-purple-800 text-center">{mensagem}</p>
              </div>
            )}

            {alunos.length > 0 && (
              <div className="animate-slide-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Resultados da Pesquisa</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                          Módulo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {alunos.map((aluno) => (
                        <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{aluno.nome}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{aluno.curso}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{aluno.modulo}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <IndicadorRisco nivel={aluno.riscoEvasao} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button onClick={() => verDetalhes(aluno.id)} className="btn btn-sm btn-outline">
                              Ver Detalhes
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
