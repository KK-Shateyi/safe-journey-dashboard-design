'use client'

import { useState, type ReactNode } from 'react'
import { Calculator } from '@/components/calculator/calculator'

export function AppGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)

  if (unlocked) {
    return <div className="animate-in fade-in duration-300">{children}</div>
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background p-4 text-foreground">
      <Calculator onUnlock={() => setUnlocked(true)} />
    </main>
  )
}
