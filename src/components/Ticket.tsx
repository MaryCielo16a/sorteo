import { useEffect } from 'react'
import { X } from 'lucide-react'
import confetti from 'canvas-confetti'

interface TicketProps {
  ticketNumber: number
  nombre: string
  email: string
  onClose: () => void
}

export function Ticket({ ticketNumber, nombre, email, onClose }: TicketProps) {
  useEffect(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#34d399', '#fbbf24', '#f59e0b'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#34d399', '#fbbf24', '#f59e0b'],
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const ticketId = String(ticketNumber).padStart(4, '0')
  const today = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm animate-[fadeIn_0.5s_ease-out]">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="ticket-border ticket-notch overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-1">
          <div className="rounded-xl bg-white p-6">
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
                Sorteo EcoRecetas
              </p>
              <div className="my-3 text-4xl">🎟️</div>
              <p className="text-5xl font-black text-emerald-700">
                #{ticketId}
              </p>
            </div>

            <div className="my-4 border-t border-dashed border-emerald-200" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Participante</span>
                <span className="font-medium text-gray-900">{nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Correo</span>
                <span className="font-medium text-gray-900">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha</span>
                <span className="font-medium text-gray-900">{today}</span>
              </div>
            </div>

            <div className="my-4 border-t border-dashed border-emerald-200" />

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Premio: <strong className="text-amber-600">S/50</strong>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Guarda una captura de este ticket
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
