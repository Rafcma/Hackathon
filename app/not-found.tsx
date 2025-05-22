import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-purple-800 mb-4 font-cinzel">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-cinzel">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-8">Desculpe, a página que você está procurando não existe ou foi movida.</p>
        <Link href="/" className="btn btn-primary py-3 px-6 rounded-md font-medium">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  )
}
