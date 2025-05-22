import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LogoEnhanced({ size = "md", className }: LogoProps) {
  const sizes = {
    sm: { container: "w-10 h-10", image: 32 },
    md: { container: "w-14 h-14", image: 48 },
    lg: { container: "w-20 h-20", image: 64 },
  }

  return (
    <div
      className={cn(
        sizes[size].container,
        "relative overflow-hidden rounded-full bg-purple-50 flex items-center justify-center shadow-lg",
        className,
      )}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-transparent opacity-20"></div>

      {/* Inner shadow for 3D effect */}
      <div className="absolute inset-0 shadow-inner rounded-full"></div>

      {/* Logo with enhanced brightness */}
      <div className="relative transform hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/logo-enhanced.png"
          alt="Logo Não se vá com IA"
          width={sizes[size].image}
          height={sizes[size].image}
          className="object-contain"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(128, 90, 213, 0.5))",
          }}
        />

        {/* Highlight effect */}
        <div className="absolute -inset-1 bg-white opacity-0 hover:opacity-10 transition-opacity rounded-full"></div>
      </div>

      {/* Outer glow */}
      <div className="absolute -inset-0.5 bg-purple-400 opacity-0 hover:opacity-20 transition-opacity rounded-full blur-sm"></div>
    </div>
  )
}
