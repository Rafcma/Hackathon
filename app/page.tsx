"use client"

import { useState } from "react"
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Filtros from "@/components/filtros"
import TabelaAlunos from "@/components/tabela-alunos"
import GraficoRisco from "@/components/grafico-risco"
import Loading from "@/components/loading"
import Footer from "@/components/footer"
import { filtrarAlunos } from "@/lib/data-client"

export default function Home() {
  const [carregando, setCarregando] = useState(false)
  const [filtros, setFiltros] = useState({ curso: "", modulo: "" })
  const [atualizacaoGrafico, setAtualizacaoGrafico] = useState(0)

  // #region Manipuladores de eventos
  const handleFiltroAplicado = async (curso: string, modulo: string) => {
    try {
      setCarregando(true)
      await filtrarAlunos(curso, modulo)
      setFiltros({ curso, modulo })
      setAtualizacaoGrafico((prev) => prev + 1) // Forçar atualização do gráfico
    } catch (erro) {
      console.error("Erro ao aplicar filtros:", erro)
      alert("Erro ao aplicar filtros. Por favor, tente novamente.")
    } finally {
      setCarregando(false)
    }
  }
  // #endregion

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-cinzel">Painel de Monitoramento</h1>
          <p className="text-gray-600">
            Acompanhe o risco de evasão dos alunos e identifique oportunidades de intervenção.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Seção de Filtros */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-800 font-cinzel">Filtros</h2>
              </div>
              <div className="card-body">
                <Filtros onFiltroAplicado={handleFiltroAplicado} carregando={carregando} />
              </div>
            </div>
          </div>

          {/* Seção de Gráfico */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-800 font-cinzel">Distribuição de Risco</h2>
              </div>
              <div className="card-body">
                <div className="h-64 flex items-center justify-center">
                  <Suspense fallback={<Loading />}>
                    <GraficoRisco atualizacao={atualizacaoGrafico} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Tabela de Alunos */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-800 font-cinzel">Lista de Alunos</h2>
          </div>
          <div className="card-body">
            <Suspense fallback={<Loading />}>
              <TabelaAlunos filtros={filtros} atualizacao={atualizacaoGrafico} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
