"use client"

import { useState, useEffect } from "react"

type FiltrosProps = {
  onFiltroAplicado: (curso: string, modulo: string) => void
  carregando: boolean
}

export default function Filtros({ onFiltroAplicado, carregando }: FiltrosProps) {
  const [curso, setCurso] = useState("")
  const [modulo, setModulo] = useState("")
  const [cursos, setCursos] = useState<string[]>([])
  const [modulos, setModulos] = useState<string[]>([])
  const [carregandoOpcoes, setCarregandoOpcoes] = useState(true)

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        setCarregandoOpcoes(true)

        const respostaCursos = await fetch("/api/opcoes/cursos")
        if (!respostaCursos.ok) throw new Error("Falha ao carregar cursos")
        const dadosCursos = await respostaCursos.json()
        setCursos(dadosCursos)

        const respostaModulos = await fetch("/api/opcoes/modulos")
        if (!respostaModulos.ok) throw new Error("Falha ao carregar módulos")
        const dadosModulos = await respostaModulos.json()
        setModulos(dadosModulos)
      } catch (erro) {
        console.error("Erro ao carregar opções:", erro)
      } finally {
        setCarregandoOpcoes(false)
      }
    }

    carregarOpcoes()
  }, [])

  const aplicarFiltros = () => {
    onFiltroAplicado(curso, modulo)
  }

  const limparFiltros = () => {
    setCurso("")
    setModulo("")
    onFiltroAplicado("", "")
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <select
          className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#efece3]"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          disabled={carregando || carregandoOpcoes}
        >
          <option value="">Selecione o Curso</option>
          {cursos.map((opcaoCurso) => (
            <option key={opcaoCurso} value={opcaoCurso}>
              {opcaoCurso}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          className="w-full p-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#efece3]"
          value={modulo}
          onChange={(e) => setModulo(e.target.value)}
          disabled={carregando || carregandoOpcoes}
        >
          <option value="">Selecione o Módulo</option>
          {modulos.map((opcaoModulo) => (
            <option key={opcaoModulo} value={opcaoModulo}>
              {opcaoModulo}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className={`btn-3d btn-3d-primary py-3 px-4 rounded-md font-medium ${
            carregando || carregandoOpcoes ? "btn-3d-disabled" : ""
          }`}
          onClick={aplicarFiltros}
          disabled={carregando || carregandoOpcoes}
        >
          {carregando ? "Aplicando..." : "Aplicar Filtros"}
        </button>

        <button
          className={`btn-3d btn-3d-secondary py-3 px-4 rounded-md font-medium ${
            carregando || carregandoOpcoes ? "btn-3d-disabled" : ""
          }`}
          onClick={limparFiltros}
          disabled={carregando || carregandoOpcoes}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  )
}
