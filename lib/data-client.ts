import type { Aluno, EstatisticasRisco, FiltrosAlunos } from "./types"

let filtrosAtuais: FiltrosAlunos = {}
let dadosCache: Aluno[] | null = null
let estatisticasCache: EstatisticasRisco | null = null

export async function filtrarAlunos(curso: string, modulo: string): Promise<void> {
  try {
    console.log(`Aplicando filtros: curso=${curso}, modulo=${modulo}`)

    filtrosAtuais = {
      curso: curso || undefined,
      modulo: modulo || undefined,
    }

    dadosCache = null
    estatisticasCache = null

    const resposta = await fetch("/api/filtros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtrosAtuais),
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro ao aplicar filtros (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao aplicar filtros: ${resposta.status}`)
    }

    console.log("Filtros aplicados com sucesso")
  } catch (erro) {
    console.error("Erro ao filtrar alunos:", erro)
    throw erro
  }
}

export async function getAlunos(): Promise<Aluno[]> {
  try {
    if (dadosCache) {
      return dadosCache
    }

    console.log("Buscando alunos da API...")

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

    const resposta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro ao obter alunos (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao obter alunos: ${resposta.status}`)
    }

    const dados = await resposta.json()
    console.log(`${dados.length} alunos obtidos com sucesso`)
    dadosCache = dados
    return dados
  } catch (erro) {
    console.error("Erro ao obter alunos:", erro)
    throw erro
  }
}

export async function getEstatisticasRisco(): Promise<EstatisticasRisco> {
  try {
    if (estatisticasCache) {
      return estatisticasCache
    }

    console.log("Buscando estatísticas de risco...")

    let url = "/api/estatisticas"
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

    const resposta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro ao obter estatísticas (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao obter estatísticas: ${resposta.status}`)
    }

    const dados = await resposta.json()
    console.log("Estatísticas obtidas com sucesso:", dados)
    estatisticasCache = dados
    return dados
  } catch (erro) {
    console.error("Erro ao obter estatísticas de risco:", erro)

    const estatisticasFicticias = { baixo: 4, medio: 3, alto: 2 }
    estatisticasCache = estatisticasFicticias
    return estatisticasFicticias
  }
}
