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

  // #region Carregamento de dados
  useEffect(() => {
    async function carregarOpcoes() {
      try {
        setCarregandoOpcoes(true)

        // Carregar cursos
        const respostaCursos = await fetch("/api/opcoes/cursos")
        if (!respostaCursos.ok) throw new Error("Falha ao carregar cursos")
        const dadosCursos = await respostaCursos.json()
        setCursos(dadosCursos)

        // Carregar módulos
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
  // #endregion

  // #region Manipuladores de eventos
  const aplicarFiltros = () => {
    onFiltroAplicado(curso, modulo)
  }

  const limparFiltros = () => {
    setCurso("")
    setModulo("")
    onFiltroAplicado("", "")
  }
  // #endregion

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="relative">
        <label htmlFor="curso" className="block text-sm font-medium text-gray-700 mb-1">
          Curso
        </label>
        <select
          id="curso"
          className="select"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          disabled={carregando || carregandoOpcoes}
        >
          <option value="">Todos os Cursos</option>
          {cursos.map((opcaoCurso) => (
            <option key={opcaoCurso} value={opcaoCurso}>
              {opcaoCurso}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label htmlFor="modulo" className="block text-sm font-medium text-gray-700 mb-1">
          Módulo
        </label>
        <select
          id="modulo"
          className="select"
          value={modulo}
          onChange={(e) => setModulo(e.target.value)}
          disabled={carregando || carregandoOpcoes}
        >
          <option value="">Todos os Módulos</option>
          {modulos.map((opcaoModulo) => (
            <option key={opcaoModulo} value={opcaoModulo}>
              {opcaoModulo}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          className={`btn btn-primary ${carregando || carregandoOpcoes ? "btn-disabled" : ""}`}
          onClick={aplicarFiltros}
          disabled={carregando || carregandoOpcoes}
        >
          {carregando ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Aplicando...
            </>
          ) : (
            "Aplicar Filtros"
          )}
        </button>

        <button
          className={`btn btn-outline ${carregando || carregandoOpcoes ? "btn-disabled" : ""}`}
          onClick={limparFiltros}
          disabled={carregando || carregandoOpcoes}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  )
}
