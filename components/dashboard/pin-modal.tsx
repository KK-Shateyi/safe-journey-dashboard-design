'use client'

import { useEffect, useState } from 'react'
import { Delete, ShieldCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const DEMO_PIN = '2580'
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const

export function PinModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (/^\d$/.test(e.key)) press(e.key)
      if (e.key === 'Backspace') press('del')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function press(key: string) {
    setError(false)
    if (key === 'del') {
      setPin((p) => p.slice(0, -1))
      return
    }
    const next = (pin + key).slice(0, 4)
    setPin(next)
    if (next.length === 4) {
      if (next === DEMO_PIN) {
        setTimeout(() => {
          setPin('')
          onSuccess()
        }, 180)
      } else {
        setTimeout(() => {
          setError(true)
          setPin('')
        }, 180)
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="mb-5 flex items-start justify-between">
          <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-teal">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-navy"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <h2 id="pin-title" className="text-base font-semibold text-navy">
          Enter your 4-digit PIN
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {'Demo PIN: 2580. A wrong PIN keeps the calculator disguise active.'}
        </p>

        <div className="my-6 flex justify-center gap-3" aria-live="polite">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                'size-3 rounded-full border-2 transition-all duration-200',
                error
                  ? 'border-destructive'
                  : i < pin.length
                    ? 'scale-110 border-teal bg-teal'
                    : 'border-border',
              )}
            />
          ))}
          <span className="sr-only">
            {error ? 'Incorrect PIN, try again' : `${pin.length} of 4 digits entered`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {KEYS.map((key, i) =>
            key === '' ? (
              <span key={i} />
            ) : (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                aria-label={key === 'del' ? 'Delete digit' : key}
                className="flex h-12 items-center justify-center rounded-xl bg-surface font-mono text-lg font-medium text-navy transition-all duration-200 hover:bg-accent active:scale-95"
              >
                {key === 'del' ? <Delete className="size-5" aria-hidden="true" /> : key}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
