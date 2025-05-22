import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

type IndicadorRiscoProps = {
  nivel: "baixo" | "medio" | "alto"
}

export default function IndicadorRisco({ nivel }: IndicadorRiscoProps) {
  if (nivel === "baixo") {
    return (
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 text-emerald-500 mr-1.5" />
        <span className="text-emerald-500 font-medium">Baixo</span>
      </div>
    )
  }

  if (nivel === "medio") {
    return (
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 text-amber-500 mr-1.5" />
        <span className="text-amber-500 font-medium">Médio</span>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <AlertCircle className="w-5 h-5 text-red-500 mr-1.5" />
      <span className="text-red-500 font-medium">Alto</span>
    </div>
  )
}
