import { Star } from 'lucide-react'

const stats = [
  { value: '10k+', label: 'Users supported', detail: 'across 40 care networks' },
  { value: '99.9%', label: 'Platform reliability', detail: 'uptime over the last 12 months' },
  { value: '94%', label: 'Medication adherence', detail: 'among active members' },
  { value: '<2h', label: 'Care-team response', detail: 'median reply time' },
]

export function Stats() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-rose">Trusted outcomes</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Built with clinicians. Loved by the people they care for.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#f8fafc] px-4 py-3">
            <div className="flex text-rose" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-copy">
              <span className="font-semibold text-ink">4.9</span> from 3,200+ reviews
            </p>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200/80 bg-slate-200/80 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-white p-6 transition-colors duration-200 hover:bg-[#f8fafc] md:p-8">
              <dt className="order-2 mt-3 text-sm font-semibold text-ink">{stat.label}</dt>
              <dd className="order-1 text-4xl font-bold tracking-tight text-ink md:text-5xl">{stat.value}</dd>
              <dd className="order-3 mt-1 text-sm text-slate-copy">{stat.detail}</dd>
            </div>
          ))}
        </dl>

        <figure id="about" className="mt-16 scroll-mt-20 rounded-xl bg-ink p-8 text-white md:p-12">
          <blockquote className="max-w-3xl text-pretty text-xl font-medium leading-relaxed md:text-2xl">
            {'"Halcyon gave my patients a single place to manage their care between visits. We\'ve seen fewer missed doses and far more meaningful check-ins."'}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-rose text-sm font-semibold">
              MR
            </span>
            <span>
              <span className="block text-sm font-semibold">Dr. Maya Robinson</span>
              <span className="block text-sm text-white/70">Chief Medical Officer, Northgate Health</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
