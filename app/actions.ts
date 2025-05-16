"use server"

import { atualizarFiltros } from "@/lib/data"
import { revalidatePath } from "next/cache"

export async function filtrarAlunos(curso: string, modulo: string) {
  try {
    // atualizar filtros no sistema
    await atualizarFiltros({
      curso: curso || undefined,
      modulo: modulo || undefined,
    })

    // revalidar páginas que dependem dos dados filtrados
    revalidatePath("/")
    revalidatePath("/alunos/[id]")

    return { sucesso: true }
  } catch (erro) {
    console.error("Erro ao filtrar alunos:", erro)
    throw new Error("Ocorreu um erro ao aplicar os filtros. Por favor, tente novamente.")
  }
}
