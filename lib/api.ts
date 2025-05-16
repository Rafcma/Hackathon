type TokenResponse = {
  access_token: string
  email: string
  password: string
}

type UsuarioMoodle = {
  user_id: string
  name: string
  user_lastaccess: string
}

type LogUsuario = {
  user_id: string
  name: string
  date: string
  action: string
  target: string
  component: string
  course_fullname: string
  user_lastaccess: string
}

const API_URL = "https://api.unifenas.br"
const EMAIL = "hackathon@unifenas.br"
const SENHA = "hackathon#2025"

export async function obterToken(): Promise<string> {
  try {
    console.log("Tentando obter token de acesso...")

    const resposta = await fetch(`${API_URL}/v1/get-token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: EMAIL,
        password: SENHA,
      }),
      cache: "no-store",
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro na resposta da API (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao obter token: ${resposta.status}`)
    }

    const dados: TokenResponse = await resposta.json()
    console.log("Token obtido com sucesso!")
    return dados.access_token
  } catch (erro) {
    console.error("Falha ao obter token de acesso:", erro)
    console.log("Usando token fictício devido a erro na API")
    return "token-ficticio-para-desenvolvimento-local"
  }
}

export async function obterUsuariosMoodle(): Promise<UsuarioMoodle[]> {
  try {
    console.log("Obtendo lista de usuários do Moodle...")
    const token = await obterToken()

    const resposta = await fetch(`${API_URL}/v1/moodle/usuarios`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro na resposta da API (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao obter usuários: ${resposta.status}`)
    }

    const dados = await resposta.json()
    console.log(`${dados.length} usuários obtidos com sucesso!`)
    return dados
  } catch (erro) {
    console.error("Falha ao obter usuários do Moodle:", erro)
    console.log("Usando dados fictícios devido a erro na API")
    return gerarUsuariosMoodleFicticios()
  }
}

export async function obterLogsUsuario(userId: string): Promise<LogUsuario[]> {
  try {
    console.log(`Obtendo logs para o usuário ${userId}...`)
    const token = await obterToken()

    const resposta = await fetch(`${API_URL}/v1/moodle/logs-usuario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
      cache: "no-store",
    })

    if (!resposta.ok) {
      const textoErro = await resposta.text()
      console.error(`Erro na resposta da API (${resposta.status}): ${textoErro}`)
      throw new Error(`Erro ao obter logs do usuário: ${resposta.status}`)
    }

    const dados = await resposta.json()
    console.log(`${dados.length} logs obtidos com sucesso para o usuário ${userId}!`)
    return dados
  } catch (erro) {
    console.error(`Falha ao obter logs do usuário ${userId}:`, erro)
    console.log("Usando logs fictícios devido a erro na API")
    return gerarLogsFicticios(userId)
  }
}

function gerarUsuariosMoodleFicticios(): UsuarioMoodle[] {
  const nomes = [
    "Ana Silva",
    "Carlos Oliveira",
    "Maria Santos",
    "Pedro Costa",
    "Juliana Lima",
    "Roberto Almeida",
    "Fernanda Silva",
    "Lucas Martins",
    "Camila Pereira",
    "Gabriel Ferreira",
  ]

  return nomes.map((nome, index) => {
    const dataAtual = new Date()
    const diasAleatorios = Math.floor(Math.random() * 30)
    dataAtual.setDate(dataAtual.getDate() - diasAleatorios)
    const dataFormatada = dataAtual.toISOString().replace("T", " ").substring(0, 19) + ".000"

    return {
      user_id: `USER_${(index + 1).toString().padStart(3, "0")}`,
      name: nome,
      user_lastaccess: dataFormatada,
    }
  })
}

function gerarLogsFicticios(userId: string): LogUsuario[] {
  const acoes = ["viewed", "created", "updated", "deleted", "submitted"]
  const alvos = ["course", "assignment", "forum", "resource", "quiz"]
  const componentes = ["core", "mod_forum", "mod_assignment", "mod_quiz", "mod_resource"]
  const cursos = ["COURSE_D2E00479C37A5088", "COURSE_A1B23456C789D012", "COURSE_E3F45678G901H234"]

  const logs: LogUsuario[] = []
  const numLogs = Math.floor(Math.random() * 10) + 5
  const dataAtual = new Date()
  const nomeUsuario = `Usuário ${userId.split("_")[1]}`

  for (let i = 0; i < numLogs; i++) {
    const diasAleatorios = Math.floor(Math.random() * 30)
    const dataLog = new Date(dataAtual)
    dataLog.setDate(dataLog.getDate() - diasAleatorios)
    const dataFormatada = dataLog.toISOString().replace("T", " ").substring(0, 19)

    logs.push({
      user_id: userId,
      name: nomeUsuario,
      date: dataFormatada,
      action: acoes[Math.floor(Math.random() * acoes.length)],
      target: alvos[Math.floor(Math.random() * alvos.length)],
      component: componentes[Math.floor(Math.random() * componentes.length)],
      course_fullname: cursos[Math.floor(Math.random() * cursos.length)],
      user_lastaccess: dataAtual.toISOString().replace("T", " ").substring(0, 19) + ".000",
    })
  }

  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
