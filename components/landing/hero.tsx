import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroWidget } from './hero-widget'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20 lg:grid-cols-2 lg:gap-10">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose/20 bg-rose-soft px-3 py-1 text-xs font-medium text-rose">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            HIPAA-compliant &amp; clinician reviewed
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Care that keeps pace with your everyday life.
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-copy">
            Halcyon brings medication reminders, symptom tracking and secure messaging with your
            care team into one calm, private companion — so staying well feels effortless.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-ink px-6 text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-hover hover:shadow-lg hover:shadow-ink/20"
            >
              Start free for 30 days
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-200 bg-white px-6 text-base text-ink transition-all duration-200 hover:border-rose/40 hover:bg-rose-soft/50 hover:text-ink"
            >
              <PlayCircle className="size-4 text-rose" aria-hidden="true" />
              Watch 2-min demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-copy">
            No credit card required. Cancel anytime.
          </p>
        </div>

        <HeroWidget />
      </div>
    </section>
  )
}
