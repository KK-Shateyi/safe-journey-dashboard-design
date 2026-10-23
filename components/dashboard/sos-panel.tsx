'use client'

import { useEffect, useState } from 'react'
import { Phone, Siren } from 'lucide-react'
import { Panel } from './panel'

export function SosPanel() {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      setSent(true)
      setCountdown(null)
      return
    }
    const id = setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  const active = countdown !== null

  return (
    <Panel className="flex flex-col gap-3">
      <div className="flex items-stretch gap-3">
        <button
          type="button"
          onClick={() => {
            if (active) setCountdown(null)
            else {
              setSent(false)
              setCountdown(3)
            }
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-xl font-bold tracking-wider text-white uppercase shadow-lg shadow-red-200 transition-all duration-200 hover:bg-red-700 active:scale-[0.98]"
        >
          <Siren className="size-6" aria-hidden="true" />
          {active ? `Cancel · ${countdown}` : 'SOS'}
        </button>
        <a
          href="tel:911"
          aria-label="Speed Dial Emergency Services (911)"
          title="Speed Dial Emergency Services"
          className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-red-600/20 bg-red-50 text-red-600 transition-all duration-200 hover:border-red-600 hover:bg-red-100"
        >
          <Phone className="size-5" aria-hidden="true" />
          <span className="text-[10px] font-bold">911</span>
        </a>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground" aria-live="assertive">
        {sent
          ? 'SOS sent. Location, audio and camera stream shared with 4 ICE contacts and local dispatch.'
          : 'Hold-free trigger with a 3-second cancel window. Shares live location, audio and camera with your ICE network.'}
      </p>
    </Panel>
  )
}
