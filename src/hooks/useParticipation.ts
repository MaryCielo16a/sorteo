import { useState, useCallback } from 'react'
import { APPS_SCRIPT_URL } from '../config/constants'

interface ParticipationData {
  nombre: string
  email: string
  capturaRegistro: string
  capturaFormulario: string
}

interface ParticipationState {
  loading: boolean
  error: string | null
  ticketNumber: number | null
  submitted: boolean
}

function getStoredTicket(): { ticketNumber: number; email: string } | null {
  try {
    const stored = localStorage.getItem('sorteo_ecorecetas_ticket')
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return null
}

function storeTicket(ticketNumber: number, email: string) {
  try {
    localStorage.setItem(
      'sorteo_ecorecetas_ticket',
      JSON.stringify({ ticketNumber, email })
    )
  } catch {
    // ignore
  }
}

export function useParticipation() {
  const stored = getStoredTicket()

  const [state, setState] = useState<ParticipationState>({
    loading: false,
    error: null,
    ticketNumber: stored?.ticketNumber ?? null,
    submitted: stored !== null,
  })

  const submit = useCallback(async (data: ParticipationData) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      if (APPS_SCRIPT_URL === 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI') {
        throw new Error(
          'Configura la URL del Google Apps Script en src/config/constants.ts'
        )
      }

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al registrar la participación')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Error al registrar')
      }

      storeTicket(result.ticket, data.email)

      setState({
        loading: false,
        error: null,
        ticketNumber: result.ticket,
        submitted: true,
      })

      return result.ticket as number
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error desconocido'
      setState(prev => ({ ...prev, loading: false, error: message }))
      return null
    }
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return { ...state, submit, clearError }
}
