import { Gift, Leaf } from 'lucide-react'
import { PRIZE_AMOUNT } from '../config/constants'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 px-4 py-16 text-white sm:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🌱</div>
        <div className="absolute top-20 right-20 text-6xl">🍃</div>
        <div className="absolute bottom-10 left-1/3 text-7xl">🌿</div>
        <div className="absolute bottom-20 right-10 text-5xl">♻️</div>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <Leaf className="h-4 w-4" />
          Proyecto de Tesis — EcoRecetas
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Sorteo EcoRecetas
        </h1>

        <p className="mb-8 text-xl text-emerald-50 sm:text-2xl">
          Participa y gana{' '}
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-3 py-1 font-bold text-amber-900">
            <Gift className="h-5 w-5" />
            {PRIZE_AMOUNT}
          </span>
        </p>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-emerald-100 sm:text-lg">
          <strong>EcoRecetas</strong> es una app que te ayuda a reducir el
          desperdicio de alimentos en tu hogar. Registra tus ingredientes,
          recibe recetas inteligentes y aprovecha lo que tienes antes de que se
          venza.
        </p>
      </div>
    </section>
  )
}
