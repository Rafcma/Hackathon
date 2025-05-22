import Link from "next/link"
import LogoRedesigned from "./logo-redesigned"

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="logo-hover-effect">
            <LogoRedesigned variant="default" />
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-base font-medium text-gray-700 hover:text-purple-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pesquisa"
                className="text-base font-medium text-gray-700 hover:text-purple-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="text-base font-medium text-gray-700 hover:text-purple-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
