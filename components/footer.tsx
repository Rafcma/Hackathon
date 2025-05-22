import LogoRedesigned from "./logo-redesigned"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <LogoRedesigned variant="compact" />
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Não se vá com IA. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Sistema de prevenção de evasão escolar com inteligência artificial
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
