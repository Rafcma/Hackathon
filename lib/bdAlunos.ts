// #region Tipos
import type { Aluno, LogAluno, FiltrosAlunos } from "./types"
import { calcularRiscoEvasao } from "./ia"

// #region Banco de Dados
// Dados fictícios para simular um banco de dados
const alunosBD: Aluno[] = [
  {
    id: 1,
    nome: "Ana Silva",
    curso: "Design Digital",
    modulo: "Módulo 1",
    presenca: 95,
    notas: 8.5,
    acessos: 20,
    participacaoForuns: 4,
    atividadesConcluidas: 6,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    userId: "USER_001",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    curso: "Ciência da Computação",
    modulo: "Módulo 4",
    presenca: 90,
    notas: 8.2,
    acessos: 23,
    participacaoForuns: 4,
    atividadesConcluidas: 4,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    userId: "USER_002",
  },
  {
    id: 3,
    nome: "Maria Santos",
    curso: "Odontologia",
    modulo: "Módulo 7",
    presenca: 45,
    notas: 5.1,
    acessos: 24,
    participacaoForuns: 0,
    atividadesConcluidas: 3,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    userId: "USER_003",
  },
  {
    id: 4,
    nome: "Pedro Miguel",
    curso: "História",
    modulo: "Módulo 1",
    presenca: 98,
    notas: 9.2,
    acessos: 14,
    participacaoForuns: 4,
    atividadesConcluidas: 6,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    userId: "USER_004",
  },
  {
    id: 5,
    nome: "Juliana Lima",
    curso: "Design Digital",
    modulo: "Módulo 4",
    presenca: 88,
    notas: 7.8,
    acessos: 10,
    participacaoForuns: 4,
    atividadesConcluidas: 3,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    userId: "USER_005",
  },
  {
    id: 6,
    nome: "Roberto Almeida",
    curso: "Ciência da Computação",
    modulo: "Módulo 4",
    presenca: 70,
    notas: 6.2,
    acessos: 6,
    participacaoForuns: 1,
    atividadesConcluidas: 5,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    userId: "USER_006",
  },
  {
    id: 7,
    nome: "Lucas Carvalho",
    curso: "Ciência da Computação",
    modulo: "Módulo 3",
    presenca: 65,
    notas: 6.8,
    acessos: 8,
    participacaoForuns: 2,
    atividadesConcluidas: 4,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    userId: "USER_007",
  },
  {
    id: 8,
    nome: "Jorge Mendes",
    curso: "História",
    modulo: "Módulo 4",
    presenca: 92,
    notas: 8.7,
    acessos: 18,
    participacaoForuns: 5,
    atividadesConcluidas: 6,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    userId: "USER_008",
  },
  {
    id: 9,
    nome: "César Augusto",
    curso: "Psicologia",
    modulo: "Módulo 5",
    presenca: 30,
    notas: 4.2,
    acessos: 3,
    participacaoForuns: 0,
    atividadesConcluidas: 1,
    riscoEvasao: "alto",
    ultimoAcesso: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    userId: "USER_009",
  },
  {
    id: 10,
    nome: "Leticia Ferreira",
    curso: "Física",
    modulo: "Módulo 3",
    presenca: 35,
    notas: 3.8,
    acessos: 5,
    participacaoForuns: 1,
    atividadesConcluidas: 2,
    riscoEvasao: "alto",
    ultimoAcesso: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    userId: "USER_010",
  },
  {
    id: 11,
    nome: "Fernanda Costa",
    curso: "Engenharia de Software",
    modulo: "Módulo 2",
    presenca: 85,
    notas: 7.5,
    acessos: 15,
    participacaoForuns: 3,
    atividadesConcluidas: 5,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    userId: "USER_011",
  },
  {
    id: 12,
    nome: "Gabriel Santos",
    curso: "Sistemas de Informação",
    modulo: "Módulo 5",
    presenca: 75,
    notas: 6.8,
    acessos: 12,
    participacaoForuns: 2,
    atividadesConcluidas: 4,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    userId: "USER_012",
  },
  {
    id: 13,
    nome: "Mariana Oliveira",
    curso: "Análise de Dados",
    modulo: "Módulo 3",
    presenca: 92,
    notas: 8.9,
    acessos: 22,
    participacaoForuns: 5,
    atividadesConcluidas: 6,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    userId: "USER_013",
  },
  {
    id: 14,
    nome: "Thiago Martins",
    curso: "Engenharia de Software",
    modulo: "Módulo 6",
    presenca: 40,
    notas: 5.2,
    acessos: 7,
    participacaoForuns: 1,
    atividadesConcluidas: 2,
    riscoEvasao: "alto",
    ultimoAcesso: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    userId: "USER_014",
  },
  {
    id: 15,
    nome: "Camila Rodrigues",
    curso: "Psicologia",
    modulo: "Módulo 2",
    presenca: 88,
    notas: 7.6,
    acessos: 16,
    participacaoForuns: 3,
    atividadesConcluidas: 5,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    userId: "USER_015",
  },
  {
    id: 16,
    nome: "Rafael Alves",
    curso: "Ciência da Computação",
    modulo: "Módulo 1",
    presenca: 95,
    notas: 9.0,
    acessos: 25,
    participacaoForuns: 4,
    atividadesConcluidas: 6,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    userId: "USER_016",
  },
  {
    id: 17,
    nome: "Isabela Souza",
    curso: "Design Digital",
    modulo: "Módulo 3",
    presenca: 78,
    notas: 7.2,
    acessos: 14,
    participacaoForuns: 2,
    atividadesConcluidas: 4,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    userId: "USER_017",
  },
  {
    id: 18,
    nome: "Bruno Ferreira",
    curso: "Sistemas de Informação",
    modulo: "Módulo 4",
    presenca: 82,
    notas: 7.8,
    acessos: 17,
    participacaoForuns: 3,
    atividadesConcluidas: 5,
    riscoEvasao: "baixo",
    ultimoAcesso: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    userId: "USER_018",
  },
  {
    id: 19,
    nome: "Amanda Lima",
    curso: "Física",
    modulo: "Módulo 2",
    presenca: 60,
    notas: 6.0,
    acessos: 10,
    participacaoForuns: 1,
    atividadesConcluidas: 3,
    riscoEvasao: "medio",
    ultimoAcesso: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    userId: "USER_019",
  },
  {
    id: 20,
    nome: "Leonardo Costa",
    curso: "História",
    modulo: "Módulo 5",
    presenca: 35,
    notas: 4.5,
    acessos: 5,
    participacaoForuns: 0,
    atividadesConcluidas: 2,
    riscoEvasao: "alto",
    ultimoAcesso: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    userId: "USER_020",
  },
]

// Logs fictícios para cada aluno
const logsBD: Record<string, LogAluno[]> = {}

// Gerar logs para cada aluno
alunosBD.forEach((aluno) => {
  if (!aluno.userId) return

  const logs: LogAluno[] = []
  const numLogs = Math.floor(Math.random() * 10) + 5 // 5-15 logs

  const acoes = ["visualizou", "criou", "atualizou", "enviou", "participou"]
  const alvos = ["curso", "tarefa", "fórum", "material", "avaliação"]
  const componentes = ["sistema", "fórum", "tarefa", "avaliação", "material"]
  const cursos = [aluno.curso]

  for (let i = 0; i < numLogs; i++) {
    const diasAleatorios = Math.floor(Math.random() * 30)
    const dataLog = new Date()
    dataLog.setDate(dataLog.getDate() - diasAleatorios)

    logs.push({
      data: dataLog,
      acao: acoes[Math.floor(Math.random() * acoes.length)],
      alvo: alvos[Math.floor(Math.random() * alvos.length)],
      componente: componentes[Math.floor(Math.random() * componentes.length)],
      curso: cursos[Math.floor(Math.random() * cursos.length)],
    })
  }

  // Ordenar logs por data (mais recentes primeiro)
  logs.sort((a, b) => b.data.getTime() - a.data.getTime())
  logsBD[aluno.userId] = logs
})
// #endregion

// #region Funções do Banco de Dados
// Função para obter alunos com filtros
export async function obterAlunos(filtros?: FiltrosAlunos): Promise<Aluno[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  let alunosFiltrados = [...alunosBD]

  // Aplicar filtros
  if (filtros) {
    if (filtros.curso) {
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.curso === filtros.curso)
    }

    if (filtros.modulo) {
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.modulo === filtros.modulo)
    }

    if (filtros.nome) {
      const termoBusca = filtros.nome.toLowerCase()
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.nome.toLowerCase().includes(termoBusca))
    }
  }

  // Recalcular risco para cada aluno
  return alunosFiltrados.map((aluno) => ({
    ...aluno,
    riscoEvasao: calcularRiscoEvasao(aluno),
  }))
}

// Função para obter logs de um aluno
export async function obterLogsAluno(alunoId: number): Promise<LogAluno[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  const aluno = alunosBD.find((a) => a.id === alunoId)
  if (!aluno || !aluno.userId) {
    return []
  }

  return logsBD[aluno.userId] || []
}

// Função para obter cursos disponíveis
export async function obterCursos(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  const cursos = new Set<string>()
  alunosBD.forEach((aluno) => cursos.add(aluno.curso))

  return Array.from(cursos).sort()
}

// Função para obter módulos disponíveis
export async function obterModulos(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 100))

  const modulos = new Set<string>()
  alunosBD.forEach((aluno) => modulos.add(aluno.modulo))

  return Array.from(modulos).sort((a, b) => {
    // Ordenar módulos numericamente
    const numA = Number.parseInt(a.replace("Módulo ", ""))
    const numB = Number.parseInt(b.replace("Módulo ", ""))
    return numA - numB
  })
}

// Função para buscar alunos por nome
export async function buscarAlunos(termoBusca: string): Promise<Aluno[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!termoBusca.trim()) {
    return []
  }

  const termoNormalizado = termoBusca.toLowerCase().trim()
  const alunosEncontrados = alunosBD.filter((aluno) => aluno.nome.toLowerCase().includes(termoNormalizado))

  // Recalcular risco para cada aluno
  return alunosEncontrados.map((aluno) => ({
    ...aluno,
    riscoEvasao: calcularRiscoEvasao(aluno),
  }))
}
// #endregion
