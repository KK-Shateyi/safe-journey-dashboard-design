'use client'

import { useEffect, useState } from 'react'
import { PhoneCall, PhoneIncoming, PhoneOff } from 'lucide-react'
import { Panel, PanelHeader } from './panel'
import { cn } from '@/lib/utils'

const CALLERS = ['Mom', 'Sister — Jess', 'Work — Daniel']

export function FakeCall() {
  const [delay, setDelay] = useState(15)
  const [caller, setCaller] = useState(CALLERS[0])
  const [remaining, setRemaining] = useState<number | null>(null)
  const [ringing, setRinging] = useState(false)

  useEffect(() => {
    if (remaining === null) return
    if (remaining === 0) {
      setRinging(true)
      setRemaining(null)
      return
    }
    const id = setTimeout(() => setRemaining((r) => (r === null ? null : r - 1)), 1000)
    return () => clearTimeout(id)
  }, [remaining])

  return (
    <Panel>
      <PanelHeader
        icon={PhoneIncoming}
        title="Fake Call Feature"
        description="A believable exit from uncomfortable moments"
      />

      <fieldset className="mb-4 flex flex-col gap-2">
        <legend className="mb-2 text-xs font-medium text-navy">Caller</legend>
        <div className="flex flex-wrap gap-2">
          {CALLERS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCaller(c)}
              aria-pressed={caller === c}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-xs transition-all duration-200',
                caller === c
                  ? 'border-teal bg-accent font-medium text-teal'
                  : 'border-border text-muted-foreground hover:border-teal/40 hover:text-navy',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="fake-call-delay" className="font-medium text-navy">
            Ring after
          </label>
          <span className="font-mono tabular-nums text-teal">{delay}s</span>
        </div>
        <input
          id="fake-call-delay"
          type="range"
          min={5}
          max={120}
          step={5}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer accent-teal"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>5s</span>
          <span>2 min</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRemaining(remaining === null ? delay : null)}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200',
          remaining === null
            ? 'bg-teal text-primary-foreground hover:bg-teal-hover'
            : 'bg-accent text-teal hover:bg-muted',
        )}
      >
        <PhoneCall className="size-4" aria-hidden="true" />
        {remaining === null
          ? 'Trigger Incoming Call Simulation'
          : `Ringing in ${remaining}s · Cancel`}
      </button>

      {ringing ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center">
          <div
            role="alertdialog"
            aria-labelledby="fake-caller"
            className="flex w-full max-w-xs flex-col items-center gap-6 rounded-3xl bg-navy p-8 text-primary-foreground shadow-2xl animate-in slide-in-from-bottom-8 duration-300"
          >
            <span className="text-xs text-primary-foreground/60">Incoming call…</span>
            <span className="relative flex size-20 items-center justify-center rounded-full bg-teal text-2xl font-semibold">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint/30" aria-hidden="true" />
              {caller[0]}
            </span>
            <p id="fake-caller" className="text-xl font-semibold">
              {caller}
            </p>
            <div className="flex w-full justify-around">
              <button
                type="button"
                onClick={() => setRinging(false)}
                aria-label="Decline call"
                className="flex size-14 items-center justify-center rounded-full bg-red-600 transition-all duration-200 hover:bg-red-700"
              >
                <PhoneOff className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setRinging(false)}
                aria-label="Accept call"
                className="flex size-14 items-center justify-center rounded-full bg-mint text-navy transition-all duration-200 hover:brightness-95"
              >
                <PhoneCall className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  )
}
