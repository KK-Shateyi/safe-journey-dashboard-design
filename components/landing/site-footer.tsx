import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'

const columns = [
  { title: 'Product', links: ['Features', 'Integrations', 'Security', 'Changelog'] },
  { title: 'Solutions', links: ['Individuals', 'Caregivers', 'Clinics', 'Employers'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
]

export function SiteFooter() {
  return (
    <footer id="pricing" className="scroll-mt-20 border-t border-slate-200/80 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-col gap-6 rounded-xl border border-slate-200/80 bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-xl font-semibold text-ink">Plans from $0 for individuals.</h2>
            <p className="mt-1 text-sm text-slate-copy">Team and clinic pricing scales with the people you support.</p>
          </div>
          <Button className="group h-11 rounded-xl bg-rose px-5 text-white transition-all duration-200 hover:-translate-y-px hover:bg-rose-hover hover:shadow-lg hover:shadow-rose/25">
            See pricing
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-copy">
              A calm, secure companion for everyday health — built alongside clinicians and caregivers.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-copy transition-colors duration-200 hover:text-rose"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200/80 pt-6 text-sm text-slate-copy md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Halcyon Health, Inc. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {['Privacy', 'Terms', 'HIPAA notice', 'Accessibility'].map((link) => (
              <li key={link}>
                <Link href="#" className="transition-colors duration-200 hover:text-ink">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
