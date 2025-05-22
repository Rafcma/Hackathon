import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// #region Utilitários
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarData(data: Date): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(data))
  } catch (erro) {
    console.error("Erro ao formatar data:", erro)
    return "Data inválida"
  }
}
// #endregion
