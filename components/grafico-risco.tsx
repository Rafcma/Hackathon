"use client"

import { useEffect, useState } from "react"
import { getEstatisticasRisco } from "@/lib/data-client"

export default function GraficoRisco({ atualizacao }: { atualizacao: number }) {
  const [dados, setDados] = useState({ baixo: 0, medio: 0, alto: 0 })
  const [carregando, setCarregando] = useState(true)

  // #region Carregamento de dados
  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true)
        const estatisticas = await getEstatisticasRisco()
        setDados(estatisticas)
      } catch (erro) {
        console.error("Erro ao carregar estatísticas:", erro)
        setDados({ baixo: 0, medio: 0, alto: 0 })
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [atualizacao]) // Recarregar quando o contador de atualizações mudar
  // #endregion

  // #region Cálculos
  const total = dados.baixo + dados.medio + dados.alto
  const porcentagemBaixo = total > 0 ? Math.round((dados.baixo / total) * 100) : 0
  const porcentagemMedio = total > 0 ? Math.round((dados.medio / total) * 100) : 0
  const porcentagemAlto = total > 0 ? Math.round((dados.alto / total) * 100) : 0
  // #endregion

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 text-center">Nenhum aluno encontrado com os filtros atuais.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center animate-fade-in">
      {/* Gráfico circular */}
      <div className="relative w-48 h-48 transition-all duration-500 ease-in-out transform hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Círculo base */}
          <circle cx="50" cy="50" r="40" fill="white" stroke="#f3f4f6" strokeWidth="2" />

          {/* Segmentos do gráfico */}
          {porcentagemBaixo > 0 && (
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(16, 185, 129, 0.85)"
              strokeWidth="20"
              strokeDasharray={`${porcentagemBaixo * 2.51} 251`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            >
              <title>Risco Baixo: {porcentagemBaixo}%</title>
            </circle>
          )}

          {porcentagemMedio > 0 && (
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(245, 158, 11, 0.85)"
              strokeWidth="20"
              strokeDasharray={`${porcentagemMedio * 2.51} 251`}
              strokeDashoffset={`${-porcentagemBaixo * 2.51}`}
              transform="rotate(-90 50 50)"
            >
              <title>Risco Médio: {porcentagemMedio}%</title>
            </circle>
          )}

          {porcentagemAlto > 0 && (
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(239, 68, 68, 0.85)"
              strokeWidth="20"
              strokeDasharray={`${porcentagemAlto * 2.51} 251`}
              strokeDashoffset={`${-(porcentagemBaixo + porcentagemMedio) * 2.51}`}
              transform="rotate(-90 50 50)"
            >
              <title>Risco Alto: {porcentagemAlto}%</title>
            </circle>
          )}

          {/* Texto no centro */}
          <g>
            <text
              x="50"
              y="46"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
              fill="#374151"
            >
              {total}
            </text>
            <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" className="text-xs" fill="#6B7280">
              alunos
            </text>
          </g>
        </svg>
      </div>

      {/* Legenda */}
      <div className="grid grid-cols-3 gap-6 mt-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Baixo</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{dados.baixo}</div>
          <div className="text-xs text-gray-500">{porcentagemBaixo}%</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Médio</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{dados.medio}</div>
          <div className="text-xs text-gray-500">{porcentagemMedio}%</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Alto</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{dados.alto}</div>
          <div className="text-xs text-gray-500">{porcentagemAlto}%</div>
        </div>
      </div>
    </div>
  )
}
