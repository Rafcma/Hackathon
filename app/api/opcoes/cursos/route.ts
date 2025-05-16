import { NextResponse } from "next/server"
import { obterCursos } from "@/lib/data"

export async function GET() {
  try {
    const cursos = await obterCursos()
    return NextResponse.json(cursos)
  } catch (erro) {
    console.error("Erro na API de cursos:", erro)

    return NextResponse.json([
      "Engenharia de Software",
      "Ciência da Computação",
      "Sistemas de Informação",
      "Análise de Dados",
      "Design Digital",
    ])
  }
}
