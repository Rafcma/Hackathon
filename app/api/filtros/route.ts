import { type NextRequest, NextResponse } from "next/server"
import { atualizarFiltros } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const filtros = await request.json()

    await atualizarFiltros(filtros)

    return NextResponse.json({ sucesso: true })
  } catch (erro) {
    console.error("Erro na API de filtros:", erro)
    return NextResponse.json({ erro: "Erro ao atualizar filtros", sucesso: false }, { status: 500 })
  }
}
