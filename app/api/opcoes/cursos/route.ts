import { NextResponse } from "next/server"
import { obterCursosDisponiveis } from "@/lib/data"

export async function GET() {
  try {
    const cursos = await obterCursosDisponiveis()
    return NextResponse.json(cursos)
  } catch (erro) {
    console.error("Erro na API de cursos:", erro)
    return NextResponse.json({ erro: "Erro ao obter lista de cursos" }, { status: 500 })
  }
}
