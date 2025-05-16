import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <header className="bg-[#efece3] shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <Image
              src="/images/logo.png"
              alt="Logo Não se vá com IA"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800 font-cinzel">Não se vá com IA</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pesquisa"
                className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
