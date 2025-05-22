import type React from "react"
import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Não se vá com IA",
  description: "Sistema de prevenção de evasão escolar com inteligência artificial",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>{children}</body>
    </html>
  )
}
