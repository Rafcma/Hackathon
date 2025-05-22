import { type NextRequest, NextResponse } from "next/server"
import { buscarAlunos } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const termo = request.nextUrl.searchParams.get("termo") || ""

    if (!termo) {
      return NextResponse.json([])
    }

    const alunos = await buscarAlunos(termo)
    return NextResponse.json(alunos)
  } catch (erro) {
    console.error("Erro na API de busca de alunos:", erro)
    return NextResponse.json({ erro: "Erro ao buscar alunos" }, { status: 500 })
  }
}
