import { Bell, CalendarClock, Check, HeartPulse, Moon, Pill } from 'lucide-react'

const heartTrend = [42, 55, 48, 62, 58, 70, 64, 72, 66, 60, 68, 74]

export function HeroWidget() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 size-72 rounded-full bg-rose/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 size-72 rounded-full bg-ink/15 blur-3xl"
      />

      <div className="relative rounded-xl border border-white/60 bg-white/60 p-5 shadow-2xl shadow-ink/10 backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-copy">Good morning</p>
            <p className="mt-1 text-lg font-semibold text-ink">Your wellness today</p>
          </div>
          <span className="relative flex size-10 items-center justify-center rounded-xl bg-white text-ink shadow-sm">
            <Bell className="size-4" aria-hidden="true" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose ring-2 ring-white" />
            <span className="sr-only">1 new notification</span>
          </span>
        </div>

        <div className="mt-5 rounded-xl bg-ink p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <HeartPulse className="size-3.5 text-rose" aria-hidden="true" />
                Resting heart rate
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight">
                64 <span className="text-sm font-medium text-white/60">bpm</span>
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90">
              -3 vs last week
            </span>
          </div>
          <div className="mt-4 flex h-14 items-end gap-1.5" aria-hidden="true">
            {heartTrend.map((v, i) => (
              <span
                key={i}
                className={`flex-1 rounded-sm ${i === heartTrend.length - 1 ? 'bg-rose' : 'bg-white/20'}`}
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-4 shadow-sm">
            <p className="flex items-center gap-1.5 text-xs text-slate-copy">
              <Moon className="size-3.5 text-rose" aria-hidden="true" />
              Sleep goal
            </p>
            <p className="mt-2 text-xl font-semibold text-ink">7h 20m</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100} aria-label="Sleep goal progress">
              <div className="h-full w-[92%] rounded-full bg-rose" />
            </div>
          </div>
          <div className="rounded-xl bg-white/80 p-4 shadow-sm">
            <p className="flex items-center gap-1.5 text-xs text-slate-copy">
              <Pill className="size-3.5 text-rose" aria-hidden="true" />
              Medications
            </p>
            <p className="mt-2 text-xl font-semibold text-ink">2 of 3</p>
            <p className="mt-2 text-xs text-slate-copy">Next: Vitamin D at 1:00 PM</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-xl border border-rose/20 bg-rose-soft/70 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose text-white">
            <CalendarClock className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">Dr. Amara Chen · Check-in</p>
            <p className="text-xs text-slate-copy">Tomorrow, 10:30 AM · Video visit</p>
          </div>
          <span className="flex size-7 items-center justify-center rounded-full bg-white text-rose">
            <Check className="size-4" aria-hidden="true" />
            <span className="sr-only">Confirmed</span>
          </span>
        </div>
      </div>
    </div>
  )
}
