export type Aluno = {
  id: number
  nome: string
  curso: string
  modulo: string
  presenca: number
  notas: number
  acessos: number
  participacaoForuns: number
  atividadesConcluidas: number
  riscoEvasao: "baixo" | "medio" | "alto"
  ultimoAcesso?: Date
  userId?: string
}

export type EstatisticasRisco = {
  baixo: number
  medio: number
  alto: number
}

export type FiltrosAlunos = {
  curso?: string
  modulo?: string
  nome?: string
}

export type LogAluno = {
  data: Date
  acao: string
  alvo: string
  componente: string
  curso: string
}
