import { useState, useCallback } from 'react'

/**
 * useToast — lightweight toast notification manager.
 * Returns { toasts, showToast } where:
 *   toasts     = array of { id, message, type }
 *   showToast  = (message, type?) => void
 *   type options: 'success' | 'error' | 'info'
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return { toasts, showToast }
}
