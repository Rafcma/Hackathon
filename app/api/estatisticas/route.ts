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

    // Calcular estatísticas diretamente dos alunos filtrados
    const estatisticas = {
      baixo: 0,
      medio: 0,
      alto: 0,
    }

    // Contar alunos por nível de risco
    alunos.forEach((aluno) => {
      estatisticas[aluno.riscoEvasao]++
    })

    return NextResponse.json(estatisticas)
  } catch (erro) {
    console.error("Erro na API de estatísticas:", erro)
    return NextResponse.json({ erro: "Erro ao obter estatísticas de risco" }, { status: 500 })
  }
}
