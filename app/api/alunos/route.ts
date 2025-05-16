import { type NextRequest, NextResponse } from "next/server"
import { getAlunos } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const curso = searchParams.get("curso") || undefined
    const modulo = searchParams.get("modulo") || undefined

    const alunos = await getAlunos({ curso, modulo })

    return NextResponse.json(alunos)
  } catch (erro) {
    console.error("Erro na API de alunos:", erro)

    // dados fictícios em caso de erro
    const dadosFicticios = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      nome: `Aluno Exemplo ${i + 1}`,
      curso: "Curso Exemplo",
      modulo: `Módulo ${(i % 5) + 1}`,
      presenca: Math.floor(Math.random() * 60) + 40,
      notas: Math.random() * 6 + 4,
      acessos: Math.floor(Math.random() * 25) + 5,
      participacaoForuns: Math.floor(Math.random() * 5),
      atividadesConcluidas: Math.floor(Math.random() * 6) + 1,
      riscoEvasao: ["baixo", "medio", "alto"][Math.floor(Math.random() * 3)] as "baixo" | "medio" | "alto",
      ultimoAcesso: new Date(),
      userId: `USER_${(i + 1).toString().padStart(3, "0")}`,
    }))

    return NextResponse.json(dadosFicticios)
  }
}
