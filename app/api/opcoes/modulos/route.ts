import { NextResponse } from "next/server"
import { obterModulos } from "@/lib/data"

export async function GET() {
  try {
    const modulos = await obterModulos()
    return NextResponse.json(modulos)
  } catch (erro) {
    console.error("Erro na API de módulos:", erro)

    return NextResponse.json(["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"])
  }
}
