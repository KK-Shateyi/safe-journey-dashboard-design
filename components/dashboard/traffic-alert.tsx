'use client'

import { useState } from 'react'
import { BellRing, TriangleAlert, X } from 'lucide-react'

export function TrafficAlert() {
  const [dismissed, setDismissed] = useState(false)
  const [sent, setSent] = useState(false)

  if (dismissed) return null

  return (
    <div
      role="status"
      className="flex flex-col gap-4 rounded-2xl bg-navy p-4 text-primary-foreground sm:flex-row sm:items-center"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint/15 text-mint">
        <TriangleAlert className="size-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-semibold">Traffic Alert · Congestion on Harbor Blvd (+12 min)</p>
        <p className="text-xs leading-relaxed text-primary-foreground/70">
          {sent
            ? 'Delay notice sent to Mom, Priya, Daniel & Grace with your updated ETA of 10:31 PM.'
            : 'Automated ICE notification scheduled in 2:00 min so your contacts know you are safe but delayed.'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSent(true)}
          disabled={sent}
          className="flex items-center gap-1.5 rounded-lg bg-teal px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-teal-hover disabled:bg-mint disabled:text-navy"
        >
          <BellRing className="size-3.5" aria-hidden="true" />
          {sent ? 'ICE contacts notified' : 'Notify now'}
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss traffic alert"
          className="rounded-lg p-2 text-primary-foreground/60 transition-all duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
