import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { ImageUpload } from './ImageUpload'
import { useParticipation } from '../hooks/useParticipation'
import { Ticket } from './Ticket'

export function ParticipationForm() {
  const { loading, error, ticketNumber, submitted, submit, clearError } =
    useParticipation()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [capturaRegistro, setCapturaRegistro] = useState<string | null>(null)
  const [capturaFormulario, setCapturaFormulario] = useState<string | null>(null)
  const [showTicket, setShowTicket] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const formComplete =
    nombre.trim().length > 0 &&
    emailValid &&
    capturaRegistro !== null &&
    capturaFormulario !== null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formComplete || loading) return

    const ticket = await submit({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      capturaRegistro: capturaRegistro!,
      capturaFormulario: capturaFormulario!,
    })

    if (ticket !== null) {
      setShowTicket(true)
    }
  }

  if (submitted && ticketNumber !== null) {
    return (
      <>
        <section id="formulario" className="px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="mb-2 text-2xl font-bold text-emerald-900">
                ¡Ya estás participando!
              </h3>
              <p className="mb-6 text-gray-600">
                Tu número de ticket es:
              </p>
              <button
                onClick={() => setShowTicket(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-emerald-600"
              >
                🎟️ Ver Ticket #{String(ticketNumber).padStart(4, '0')}
              </button>
            </div>
          </div>
        </section>

        {showTicket && (
          <Ticket
            ticketNumber={ticketNumber}
            nombre={nombre || 'Participante'}
            email={email || ''}
            onClose={() => setShowTicket(false)}
          />
        )}
      </>
    )
  }

  return (
    <section id="formulario" className="px-4 py-16">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-2 text-center text-3xl font-bold text-emerald-900">
          Obtén tu ticket
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Completa los pasos anteriores, sube tus capturas y participa
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-emerald-800"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              required
              placeholder="Ej: María García López"
              value={nombre}
              onChange={e => {
                setNombre(e.target.value)
                clearError()
              }}
              className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-emerald-800"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                clearError()
              }}
              className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            {email.length > 0 && !emailValid && (
              <p className="text-xs text-red-500">
                Ingresa un correo válido
              </p>
            )}
          </div>

          <ImageUpload
            label="Captura de tu registro en EcoRecetas"
            value={capturaRegistro}
            onChange={setCapturaRegistro}
          />

          <ImageUpload
            label="Captura del formulario completado"
            value={capturaFormulario}
            onChange={setCapturaFormulario}
          />

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!formComplete || loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Participar en el Sorteo
              </>
            )}
          </button>
        </form>
      </div>

      {showTicket && ticketNumber !== null && (
        <Ticket
          ticketNumber={ticketNumber}
          nombre={nombre}
          email={email}
          onClose={() => setShowTicket(false)}
        />
      )}
    </section>
  )
}
