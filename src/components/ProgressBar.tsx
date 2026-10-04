import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { APPS_SCRIPT_URL, PARTICIPANT_GOAL } from '../config/constants'

export function ProgressBar() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (APPS_SCRIPT_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') return

    fetch(APPS_SCRIPT_URL)
      .then(r => r.json())
      .then(data => {
        if (typeof data.count === 'number') setCount(data.count)
      })
      .catch(() => {
        // silently fail
      })
  }, [])

  const percentage = Math.min((count / PARTICIPANT_GOAL) * 100, 100)

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-700">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Participantes</span>
            </div>
            <span className="text-sm font-bold text-emerald-900">
              {count} / {PARTICIPANT_GOAL}
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-3 text-center text-xs text-gray-500">
            {count >= PARTICIPANT_GOAL
              ? '¡Meta alcanzada! El sorteo se realizará pronto.'
              : `Faltan ${PARTICIPANT_GOAL - count} participantes para el sorteo`}
          </p>
        </div>
      </div>
    </section>
  )
}
