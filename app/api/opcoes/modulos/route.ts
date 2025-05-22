import { NextResponse } from "next/server"
import { obterModulosDisponiveis } from "@/lib/data"

export async function GET() {
  try {
    const modulos = await obterModulosDisponiveis()
    return NextResponse.json(modulos)
  } catch (erro) {
    console.error("Erro na API de módulos:", erro)
    return NextResponse.json({ erro: "Erro ao obter lista de módulos" }, { status: 500 })
  }
}
