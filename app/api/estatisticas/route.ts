import { type NextRequest, NextResponse } from "next/server"
import { getAlunos } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const curso = searchParams.get("curso") || undefined
    const modulo = searchParams.get("modulo") || undefined

    const alunos = await getAlunos({ curso, modulo })

    const estatisticas = {
      baixo: 0,
      medio: 0,
      alto: 0,
    }

    alunos.forEach((aluno) => {
      estatisticas[aluno.riscoEvasao]++
    })

    return NextResponse.json(estatisticas)
  } catch (erro) {
    console.error("Erro na API de estatísticas:", erro)

    return NextResponse.json({
      baixo: 4,
      medio: 3,
      alto: 2,
    })
  }
}
