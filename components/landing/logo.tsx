import Link from 'next/link'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 rounded-xl', className)}
      aria-label="Halcyon home"
    >
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-xl',
          inverted ? 'bg-white/10 text-white' : 'bg-ink text-white',
        )}
      >
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          'text-lg font-semibold tracking-tight',
          inverted ? 'text-white' : 'text-ink',
        )}
      >
        Halcyon
      </span>
    </Link>
  )
}
