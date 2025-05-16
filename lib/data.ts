import type { Aluno, FiltrosAlunos, LogAluno } from "./types"
import { calcularRiscoEvasao } from "./ia"
import { obterUsuariosMoodle, obterLogsUsuario } from "./api"

let filtrosAtuais: FiltrosAlunos = {}
let dadosCache: Aluno[] | null = null
let ultimaAtualizacao = 0
const logsCache: Record<string, LogAluno[]> = {}

export async function getAlunos(filtros?: FiltrosAlunos): Promise<Aluno[]> {
  try {
    const agora = Date.now()
    if (!dadosCache || agora - ultimaAtualizacao > 5 * 60 * 1000) {
      await atualizarDadosAlunos()
    }

    const filtrosEfetivos = filtros || filtrosAtuais

    let alunosFiltrados = [...(dadosCache || [])]

    if (filtrosEfetivos.curso) {
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.curso === filtrosEfetivos.curso)
    }

    if (filtrosEfetivos.modulo) {
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.modulo === filtrosEfetivos.modulo)
    }

    if (filtrosEfetivos.nome) {
      const termoBusca = filtrosEfetivos.nome.toLowerCase()
      alunosFiltrados = alunosFiltrados.filter((aluno) => aluno.nome.toLowerCase().includes(termoBusca))
    }

    return alunosFiltrados.map((aluno) => ({
      ...aluno,
      riscoEvasao: calcularRiscoEvasao(aluno),
    }))
  } catch (erro) {
    console.error("Erro ao obter alunos:", erro)
    return dadosExemplo.map((aluno) => ({
      ...aluno,
      riscoEvasao: calcularRiscoEvasao(aluno),
    }))
  }
}

async function atualizarDadosAlunos(): Promise<void> {
  try {
    console.log("Atualizando dados dos alunos...")
    const usuariosMoodle = await obterUsuariosMoodle()

    if (!usuariosMoodle || usuariosMoodle.length === 0) {
      throw new Error("Nenhum dado de usuário retornado")
    }

    const cursos = [
      "Engenharia de Software",
      "Ciência da Computação",
      "Sistemas de Informação",
      "Análise de Dados",
      "Design Digital",
      "Psicologia",
      "História",
      "Odontologia",
      "Física",
    ]
    const modulos = ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5", "Módulo 6", "Módulo 7"]

    dadosCache = usuariosMoodle.map((usuario, index) => {
      const presenca = Math.floor(Math.random() * 60) + 40
      const notas = Math.random() * 6 + 4
      const acessos = Math.floor(Math.random() * 25) + 5
      const participacaoForuns = Math.floor(Math.random() * 5)
      const atividadesConcluidas = Math.floor(Math.random() * 6) + 1

      const curso = cursos[Math.floor(Math.random() * cursos.length)]
      const modulo = modulos[Math.floor(Math.random() * modulos.length)]

      const nome = usuario.name
      const ultimoAcesso = new Date(usuario.user_lastaccess)

      return {
        id: index + 1,
        nome,
        curso,
        modulo,
        presenca,
        notas,
        acessos,
        participacaoForuns,
        atividadesConcluidas,
        riscoEvasao: "baixo",
        ultimoAcesso,
        userId: usuario.user_id,
      }
    })

    ultimaAtualizacao = Date.now()
    console.log(`${dadosCache.length} alunos carregados com sucesso!`)
  } catch (erro) {
    console.error("Erro ao atualizar dados dos alunos:", erro)
    dadosCache = dadosExemplo
    ultimaAtualizacao = Date.now()
  }
}

export async function atualizarFiltros(filtros: FiltrosAlunos): Promise<void> {
  filtrosAtuais = { ...filtros }

  Object.keys(logsCache).forEach((key) => {
    delete logsCache[key]
  })
}

export async function getLogsAluno(alunoId: number): Promise<LogAluno[]> {
  try {
    const alunos = await getAlunos()
    const aluno = alunos.find((a) => a.id === alunoId)

    if (!aluno || !aluno.userId) {
      throw new Error("Aluno não encontrado ou sem ID de usuário")
    }

    const userId = aluno.userId

    if (logsCache[userId]) {
      return logsCache[userId]
    }

    const logsApi = await obterLogsUsuario(userId)

    const logs: LogAluno[] = logsApi.map((log) => ({
      data: new Date(log.date),
      acao: log.action,
      alvo: log.target,
      componente: log.component,
      curso: log.course_fullname,
    }))

    logsCache[userId] = logs

    return logs
  } catch (erro) {
    console.error(`Erro ao obter logs do aluno ${alunoId}:`, erro)
    return []
  }
}

export async function obterCursos(): Promise<string[]> {
  try {
    if (!dadosCache) {
      await atualizarDadosAlunos()
    }

    const cursos = new Set<string>()
    dadosCache?.forEach((aluno) => cursos.add(aluno.curso))

    return Array.from(cursos).sort()
  } catch (erro) {
    console.error("Erro ao obter cursos:", erro)
    return [
      "Engenharia de Software",
      "Ciência da Computação",
      "Sistemas de Informação",
      "Análise de Dados",
      "Design Digital",
    ]
  }
}

export async function obterModulos(): Promise<string[]> {
  try {
    if (!dadosCache) {
      await atualizarDadosAlunos()
    }

    const modulos = new Set<string>()
    dadosCache?.forEach((aluno) => modulos.add(aluno.modulo))

    return Array.from(modulos).sort((a, b) => {
      const numA = Number.parseInt(a.replace("Módulo ", ""))
      const numB = Number.parseInt(b.replace("Módulo ", ""))
      return numA - numB
    })
  } catch (erro) {
    console.error("Erro ao obter módulos:", erro)
    return ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"]
  }
}

export async function buscarAlunos(termoBusca: string): Promise<Aluno[]> {
  try {
    if (!termoBusca.trim()) {
      return []
    }

    const alunos = await getAlunos()
    const termoNormalizado = termoBusca.toLowerCase().trim()

    return alunos.filter((aluno) => aluno.nome.toLowerCase().includes(termoNormalizado))
  } catch (erro) {
    console.error("Erro ao buscar alunos:", erro)
    return []
  }
}

const dadosExemplo: Aluno[] = [
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
    ultimoAcesso: new Date(),
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
    nome: "Jorge",
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
    nome: "César",
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
    nome: "Leticia",
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
]
