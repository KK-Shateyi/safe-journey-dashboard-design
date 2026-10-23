'use client'

import { useEffect, useState } from 'react'
import { BatteryLow, Calculator, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { PinModal } from './pin-modal'
import { cn } from '@/lib/utils'

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function TopNav() {
  const now = useClock()
  const [clockVisible, setClockVisible] = useState(false)
  const [pinOpen, setPinOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const time = now
    ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--'

  return (
    <>
      <nav
        aria-label="Primary"
        className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-xl transition-all duration-200',
                unlocked ? 'bg-teal text-primary-foreground' : 'bg-navy text-primary-foreground',
              )}
            >
              {unlocked ? (
                <ShieldCheck className="size-5" aria-hidden="true" />
              ) : (
                <Calculator className="size-5" aria-hidden="true" />
              )}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {unlocked ? 'Safe Journey' : 'SmartCalc Toolkit'}
              </span>
              <span className="text-xs text-muted-foreground">
                {unlocked ? 'Protected session · Encrypted' : 'Units · Currency · Tip split'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setClockVisible((v) => !v)}
              aria-pressed={clockVisible}
              aria-label={clockVisible ? 'Hide clock' : 'Show clock'}
              className="group flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-teal/40 hover:text-foreground"
            >
              {clockVisible ? (
                <EyeOff className="size-3.5" aria-hidden="true" />
              ) : (
                <Eye className="size-3.5" aria-hidden="true" />
              )}
              <span
                className={cn(
                  'font-mono tabular-nums transition-all duration-200',
                  clockVisible ? 'text-foreground' : 'blur-[5px] select-none',
                )}
                suppressHydrationWarning
              >
                {time}
              </span>
            </button>

            <div
              className="hidden items-center gap-1.5 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive sm:flex"
              title="Low-Battery Alert Active: ICE contacts will receive your last location at 5%."
            >
              <BatteryLow className="size-4" aria-hidden="true" />
              <span className="font-mono tabular-nums">18%</span>
              <span className="hidden lg:inline">· Low-Battery Alert Active</span>
            </div>
            <span className="sr-only sm:hidden">Battery 18 percent, low-battery alert active</span>

            <button
              type="button"
              onClick={() => (unlocked ? setUnlocked(false) : setPinOpen(true))}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-teal"
            >
              <LockKeyhole className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{unlocked ? 'Lock & disguise' : 'Secure Unlock'}</span>
              <span className="sr-only sm:hidden">{unlocked ? 'Lock and disguise' : 'Secure unlock'}</span>
            </button>
          </div>
        </div>
      </nav>

      <PinModal
        open={pinOpen}
        onClose={() => setPinOpen(false)}
        onSuccess={() => {
          setUnlocked(true)
          setPinOpen(false)
        }}
      />
    </>
  )
}
