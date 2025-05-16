import type { Aluno } from "./types"

export function calcularRiscoEvasao(aluno: Aluno): "baixo" | "medio" | "alto" {
  const pesoPresenca = 0.25
  const pesoNotas = 0.2
  const pesoAcessos = 0.2
  const pesoForuns = 0.15
  const pesoAtividades = 0.2

  const presencaNormalizada = aluno.presenca / 100
  const notasNormalizada = aluno.notas / 10

  const acessosNormalizado = Math.min(aluno.acessos / 30, 1)
  const forunsNormalizado = Math.min(aluno.participacaoForuns / 5, 1)
  const atividadesNormalizado = Math.min(aluno.atividadesConcluidas / 6, 1)

  const scoreEngajamento =
    presencaNormalizada * pesoPresenca +
    notasNormalizada * pesoNotas +
    acessosNormalizado * pesoAcessos +
    forunsNormalizado * pesoForuns +
    atividadesNormalizado * pesoAtividades

  if (scoreEngajamento >= 0.7) {
    return "baixo"
  } else if (scoreEngajamento >= 0.4) {
    return "medio"
  } else {
    return "alto"
  }
}

export function explicarResultadoIA(aluno: Aluno): string {
  const riscoCalculado = calcularRiscoEvasao(aluno)

  if (riscoCalculado === "baixo") {
    return `O aluno ${aluno.nome} apresenta baixo risco de evasão. Isso se deve à sua boa presença (${aluno.presenca}%), notas satisfatórias (média ${aluno.notas.toFixed(1)}) e participação ativa na plataforma (${aluno.acessos} acessos, ${aluno.participacaoForuns} participações em fóruns e ${aluno.atividadesConcluidas} atividades concluídas).`
  } else if (riscoCalculado === "medio") {
    return `O aluno ${aluno.nome} apresenta risco médio de evasão. Recomenda-se atenção especial aos indicadores: presença (${aluno.presenca}%), notas (média ${aluno.notas.toFixed(1)}) e participação na plataforma (${aluno.acessos} acessos, ${aluno.participacaoForuns} participações em fóruns e ${aluno.atividadesConcluidas} atividades concluídas).`
  } else {
    return `O aluno ${aluno.nome} apresenta alto risco de evasão. É necessária intervenção imediata. Os indicadores críticos são: baixa presença (${aluno.presenca}%), notas insatisfatórias (média ${aluno.notas.toFixed(1)}) e pouca participação na plataforma (${aluno.acessos} acessos, ${aluno.participacaoForuns} participações em fóruns e ${aluno.atividadesConcluidas} atividades concluídas).`
  }
}
