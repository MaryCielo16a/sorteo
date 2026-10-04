import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 flex items-center justify-center gap-1 text-sm text-gray-600">
          Hecho con <Heart className="h-4 w-4 text-red-500" /> por el equipo
          de EcoRecetas
        </p>
        <p className="text-xs text-gray-400">
          Proyecto de Tesis — Ingeniería de Sistemas de Información
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Lima, Perú — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
