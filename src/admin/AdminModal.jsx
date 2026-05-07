import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'

/* ──────────────────────────────────────────────
   Base Modal — wraps any content in a centered
   overlay with backdrop dismiss + ESC key close
────────────────────────────────────────────── */
export function Modal({ open, onClose, title, subtitle, children, size = 'md' }) {
  // Close on ESC key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const sizes = {
    sm:  'max-w-md',
    md:  'max-w-lg',
    lg:  'max-w-2xl',
    xl:  'max-w-4xl',
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`
              fixed z-50 inset-x-4 top-1/2 -translate-y-1/2
              ${sizes[size]} mx-auto
              bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden
            `}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-white/5">
              <div>
                {subtitle && (
                  <p className="text-xs text-accent font-semibold tracking-widest uppercase mb-0.5">
                    {subtitle}
                  </p>
                )}
                <h2 className="font-display text-2xl text-light">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                           hover:bg-white/10 text-muted hover:text-light transition-all mt-0.5"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto admin-scroll max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────
   Confirm Delete Modal — focused danger prompt
────────────────────────────────────────────── */
export function ConfirmModal({ open, onClose, onConfirm, itemName }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto
                       bg-surface border border-white/10 rounded-2xl shadow-2xl p-7 text-center"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-red-400/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={24} className="text-red-400" />
            </div>

            <h3 className="font-display text-2xl mb-2">Delete Item?</h3>
            {itemName && (
              <p className="text-sm text-muted mb-1">
                You're about to delete:
              </p>
            )}
            {itemName && (
              <p className="text-sm font-medium text-light bg-white/5 rounded-lg px-3 py-2 mb-4">
                "{itemName}"
              </p>
            )}
            <p className="text-xs text-muted mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-muted
                           hover:border-white/30 hover:text-light transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); onClose() }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold
                           hover:bg-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────
   Toast notification component
────────────────────────────────────────────── */
export function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium
              ${type === 'success'
                ? 'bg-green-400/10 border-green-400/20 text-green-300'
                : type === 'error'
                  ? 'bg-red-400/10 border-red-400/20 text-red-300'
                  : 'bg-surface border-white/10 text-light'
              }
            `}
          >
            {type === 'success' && <span className="text-green-400">✓</span>}
            {type === 'error'   && <span className="text-red-400">✗</span>}
            {type === 'info'    && <span className="text-accent">ℹ</span>}
            {message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Field component — uniform form field styling
────────────────────────────────────────────── */
export function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs text-muted mb-1.5 font-medium">
        {label}
        {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-muted/60 mt-1">{hint}</p>}
    </div>
  )
}

/* Shared input class */
export const inputCls = `
  w-full bg-white/3 border border-white/10 rounded-xl px-4 py-2.5
  text-sm text-light placeholder:text-muted outline-none
  focus:border-accent/50 focus:bg-white/5 transition-all duration-200
`
