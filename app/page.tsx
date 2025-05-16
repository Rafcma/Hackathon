"use client"

import { useState } from "react"
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Filtros from "@/components/filtros"
import TabelaAlunos from "@/components/tabela-alunos"
import GraficoRisco from "@/components/grafico-risco"
import Loading from "@/components/loading"
import { filtrarAlunos } from "@/lib/data-client"

export default function Home() {
  const [carregando, setCarregando] = useState(false)
  const [filtros, setFiltros] = useState({ curso: "", modulo: "" })
  const [atualizacaoGrafico, setAtualizacaoGrafico] = useState(0)

  const handleFiltroAplicado = async (curso: string, modulo: string) => {
    try {
      setCarregando(true)
      await filtrarAlunos(curso, modulo)
      setFiltros({ curso, modulo })
      setAtualizacaoGrafico((prev) => prev + 1)
    } catch (erro) {
      console.error("Erro ao aplicar filtros:", erro)
      alert("Erro ao aplicar filtros. Por favor, tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-[#efece3] rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Filtros</h2>
              <Filtros onFiltroAplicado={handleFiltroAplicado} carregando={carregando} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#efece3] rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Distribuição de Risco</h2>
              <div className="h-64 flex items-center justify-center">
                <Suspense fallback={<Loading />}>
                  <GraficoRisco atualizacao={atualizacaoGrafico} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#efece3] rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-cinzel">Lista de Alunos</h2>
          <Suspense fallback={<Loading />}>
            <TabelaAlunos filtros={filtros} atualizacao={atualizacaoGrafico} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
