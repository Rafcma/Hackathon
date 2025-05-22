import type { Aluno, FiltrosAlunos, LogAluno } from "./types"
import { obterAlunos, obterLogsAluno, obterCursos, obterModulos, buscarAlunos as bdBuscarAlunos } from "./bdAlunos"

// #region Estado
let filtrosAtuais: FiltrosAlunos = {}
let dadosCache: Aluno[] | null = null
let ultimaAtualizacao = 0
const logsCache: Record<string, LogAluno[]> = {}
// #endregion

// #region Funções de dados
export async function getAlunos(filtros?: FiltrosAlunos): Promise<Aluno[]> {
  try {
    const agora = Date.now()
    if (!dadosCache || agora - ultimaAtualizacao > 5 * 60 * 1000) {
      await atualizarDadosAlunos()
    }

    // Usar filtros fornecidos ou os filtros globais
    const filtrosEfetivos = filtros || filtrosAtuais

    // Obter alunos filtrados diretamente do BD
    return await obterAlunos(filtrosEfetivos)
  } catch (erro) {
    console.error("Erro ao obter alunos:", erro)
    return []
  }
}

async function atualizarDadosAlunos(): Promise<void> {
  try {
    // Obter todos os alunos do BD
    dadosCache = await obterAlunos()
    ultimaAtualizacao = Date.now()
  } catch (erro) {
    console.error("Erro ao atualizar dados dos alunos:", erro)
    dadosCache = []
    ultimaAtualizacao = Date.now()
  }
}

export async function atualizarFiltros(filtros: FiltrosAlunos): Promise<void> {
  // Atualizar filtros globais
  filtrosAtuais = { ...filtros }

  // Limpar cache de logs
  Object.keys(logsCache).forEach((key) => {
    delete logsCache[key]
  })
}

export async function getLogsAluno(alunoId: number): Promise<LogAluno[]> {
  try {
    // Obter logs diretamente do BD
    return await obterLogsAluno(alunoId)
  } catch (erro) {
    console.error(`Erro ao obter logs do aluno ${alunoId}:`, erro)
    return []
  }
}

export async function obterCursosDisponiveis(): Promise<string[]> {
  try {
    // Obter cursos diretamente do BD
    return await obterCursos()
  } catch (erro) {
    console.error("Erro ao obter cursos:", erro)
    return []
  }
}

export async function obterModulosDisponiveis(): Promise<string[]> {
  try {
    // Obter módulos diretamente do BD
    return await obterModulos()
  } catch (erro) {
    console.error("Erro ao obter módulos:", erro)
    return []
  }
}

export async function buscarAlunos(termoBusca: string): Promise<Aluno[]> {
  try {
    // Buscar alunos diretamente do BD
    return await bdBuscarAlunos(termoBusca)
  } catch (erro) {
    console.error("Erro ao buscar alunos:", erro)
    return []
  }
}
// #endregion
