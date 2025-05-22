import { type NextRequest, NextResponse } from "next/server"
import { getAlunos } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    // Obter parâmetros de consulta
    const searchParams = request.nextUrl.searchParams
    const curso = searchParams.get("curso") || undefined
    const modulo = searchParams.get("modulo") || undefined

    // Obter alunos filtrados
    const alunos = await getAlunos({ curso, modulo })

    return NextResponse.json(alunos)
  } catch (erro) {
    console.error("Erro na API de alunos:", erro)
    return NextResponse.json({ erro: "Erro ao obter dados dos alunos" }, { status: 500 })
  }
}
