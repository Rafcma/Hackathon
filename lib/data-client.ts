// #region Tipos
import type { Aluno, EstatisticasRisco, FiltrosAlunos } from "./types"
// #endregion

// #region Estado do cliente
let filtrosAtuais: FiltrosAlunos = {}
let dadosCache: Aluno[] | null = null
let estatisticasCache: EstatisticasRisco | null = null
// #endregion

// #region Funções de API do cliente
export async function filtrarAlunos(curso: string, modulo: string): Promise<void> {
  try {
    // Atualizar filtros locais
    filtrosAtuais = {
      curso: curso || undefined,
      modulo: modulo || undefined,
    }

    // Limpar cache para forçar nova busca
    dadosCache = null
    estatisticasCache = null

    // Chamar API para atualizar filtros no servidor
    const resposta = await fetch("/api/filtros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtrosAtuais),
    })

    if (!resposta.ok) {
      throw new Error(`Erro ao aplicar filtros: ${resposta.status}`)
    }
  } catch (erro) {
    console.error("Erro ao filtrar alunos:", erro)
    throw erro
  }
}

export async function getAlunos(): Promise<Aluno[]> {
  try {
    // Usar cache se disponível
    if (dadosCache) {
      return dadosCache
    }

    // Construir URL com parâmetros de filtro
    let url = "/api/alunos"
    const params = new URLSearchParams()

    if (filtrosAtuais.curso) {
      params.append("curso", filtrosAtuais.curso)
    }

    if (filtrosAtuais.modulo) {
      params.append("modulo", filtrosAtuais.modulo)
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    // Buscar dados da API
    const resposta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!resposta.ok) {
      throw new Error(`Erro ao obter alunos: ${resposta.status}`)
    }

    const dados = await resposta.json()
    dadosCache = dados
    return dados
  } catch (erro) {
    console.error("Erro ao obter alunos:", erro)
    throw erro
  }
}

export async function getEstatisticasRisco(): Promise<EstatisticasRisco> {
  try {
    // Usar cache se disponível
    if (estatisticasCache) {
      return estatisticasCache
    }

    // Obter alunos filtrados primeiro
    const alunos = await getAlunos()

    // Calcular estatísticas diretamente dos alunos filtrados
    const estatisticas: EstatisticasRisco = {
      baixo: 0,
      medio: 0,
      alto: 0,
    }

    // Contar alunos por nível de risco
    alunos.forEach((aluno) => {
      estatisticas[aluno.riscoEvasao]++
    })

    estatisticasCache = estatisticas
    return estatisticas
  } catch (erro) {
    console.error("Erro ao obter estatísticas de risco:", erro)
    return { baixo: 0, medio: 0, alto: 0 }
  }
}
// #endregion
