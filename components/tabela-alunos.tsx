"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAlunos } from "@/lib/data-client"
import IndicadorRisco from "./indicador-risco"
import type { Aluno } from "@/lib/types"

type TabelaAlunosProps = {
  filtros: { curso: string; modulo: string }
  atualizacao: number
}

export default function TabelaAlunos({ filtros, atualizacao }: TabelaAlunosProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregarAlunos() {
      try {
        setCarregando(true)
        setErro(null)
        const dados = await getAlunos()
        setAlunos(dados)
      } catch (error) {
        console.error("Erro ao carregar alunos:", error)
        setErro("Não foi possível carregar os dados dos alunos.")
      } finally {
        setCarregando(false)
      }
    }

    carregarAlunos()
  }, [atualizacao])

  if (carregando) {
    return <Loading />
  }

  return (
    <div className="animate-fade-in">
      {erro && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          </div>
        </div>
      )}

      {alunos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum aluno encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros para encontrar alunos.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome do Aluno
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
                  Acessos
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fóruns
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Atividades
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Risco
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/alunos/${aluno.id}`}
                      className="text-purple-800 hover:text-purple-900 transition-colors font-medium"
                    >
                      {aluno.nome}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aluno.curso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aluno.modulo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aluno.acessos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aluno.participacaoForuns}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{aluno.atividadesConcluidas}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <IndicadorRisco nivel={aluno.riscoEvasao} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Loading() {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      <span className="ml-3 text-gray-600">Carregando dados...</span>
    </div>
  )
}
