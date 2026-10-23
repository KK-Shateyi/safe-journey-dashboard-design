import {
  Activity,
  BellRing,
  FileHeart,
  Lock,
  MessagesSquare,
  Users,
  type LucideIcon,
} from 'lucide-react'

type Feature = { icon: LucideIcon; title: string; description: string }

const features: Feature[] = [
  {
    icon: BellRing,
    title: 'Smart medication reminders',
    description: 'Gentle, adaptive nudges that learn your routine and alert a caregiver if a dose is missed.',
  },
  {
    icon: Activity,
    title: 'Symptom & vitals tracking',
    description: 'Log how you feel in seconds and sync readings from 200+ wearables and home devices.',
  },
  {
    icon: MessagesSquare,
    title: 'Care-team messaging',
    description: 'Secure, encrypted chat with your clinicians — with typical replies in under two hours.',
  },
  {
    icon: FileHeart,
    title: 'Unified health records',
    description: 'Labs, prescriptions and visit notes from every provider, organized in one timeline.',
  },
  {
    icon: Users,
    title: 'Family & caregiver access',
    description: 'Share exactly what you choose with loved ones, with granular, revocable permissions.',
  },
  {
    icon: Lock,
    title: 'Privacy by design',
    description: 'HIPAA and SOC 2 Type II compliant, end-to-end encrypted, and never sold to advertisers.',
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-[#f8fafc] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-rose">Features</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything you need to stay on top of your health.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-copy">
            Thoughtfully designed tools that fit quietly into your day — and speak up only when it matters.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group rounded-xl border border-slate-200/80 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-rose/30 hover:shadow-xl hover:shadow-ink/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-rose-soft text-rose transition-colors duration-200 group-hover:bg-rose group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-copy">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
