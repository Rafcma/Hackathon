"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar o erro no sistema de monitoramento
    console.error("Erro na aplicação:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 font-cinzel">Algo deu errado!</h1>
        <p className="text-gray-600 mb-6">Ocorreu um erro inesperado. Nossa equipe técnica foi notificada.</p>
        <div className="space-y-4">
          <button onClick={() => reset()} className="w-full btn btn-primary py-3 px-4">
            Tentar Novamente
          </button>
          <button onClick={() => (window.location.href = "/")} className="w-full btn btn-outline py-3 px-4">
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  )
}
