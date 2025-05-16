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
        setErro("Não foi possível carregar os dados dos alunos. Usando dados de exemplo.")
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
    <div>
      {erro && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
          <p className="text-amber-700">{erro}</p>
        </div>
      )}

      {alunos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Nenhum aluno encontrado com os filtros selecionados.</div>
      ) : (
        <div className="overflow-x-auto">
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
            <tbody className="bg-[#efece3] divide-y divide-gray-200">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/alunos/${aluno.id}`} className="text-blue-600 hover:text-blue-900 transition-colors">
                      <div className="text-sm font-medium">{aluno.nome}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.curso}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.modulo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.acessos}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.participacaoForuns}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.atividadesConcluidas}</div>
                  </td>
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
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Carregando dados...</span>
    </div>
  )
}
