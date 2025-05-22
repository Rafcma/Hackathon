import { type NextRequest, NextResponse } from "next/server"
import { getLogsAluno } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const alunoId = Number.parseInt(params.id)

    if (isNaN(alunoId)) {
      return NextResponse.json({ erro: "ID de aluno inválido" }, { status: 400 })
    }

    const logs = await getLogsAluno(alunoId)

    return NextResponse.json(logs)
  } catch (erro) {
    console.error(`Erro na API de logs do aluno ${params.id}:`, erro)
    return NextResponse.json({ erro: "Erro ao obter logs do aluno" }, { status: 500 })
  }
}
