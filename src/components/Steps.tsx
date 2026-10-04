import { Smartphone, ClipboardCheck, Ticket, ExternalLink } from 'lucide-react'
import { ECORECETAS_URL, FORM_URL } from '../config/constants'

const steps = [
  {
    number: 1,
    icon: Smartphone,
    title: 'Regístrate en EcoRecetas',
    description:
      'Crea tu cuenta en la app EcoRecetas. Es gratis y solo toma un minuto.',
    action: {
      label: 'Ir a EcoRecetas',
      url: ECORECETAS_URL,
    },
  },
  {
    number: 2,
    icon: ClipboardCheck,
    title: 'Completa la encuesta',
    description:
      'Llena el formulario de investigación. Tus respuestas nos ayudan a mejorar.',
    action: {
      label: 'Ir a la encuesta',
      url: FORM_URL,
    },
  },
  {
    number: 3,
    icon: Ticket,
    title: 'Obtén tu ticket',
    description:
      'Sube tus capturas de pantalla como prueba y recibe tu número de ticket para el sorteo.',
    action: null,
  },
]

export function Steps() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-emerald-900">
          ¿Cómo participar?
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Solo 3 pasos sencillos para entrar al sorteo
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(step => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-emerald-900">
                  {step.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>

                {step.action && (
                  <a
                    href={step.action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                  >
                    {step.action.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
