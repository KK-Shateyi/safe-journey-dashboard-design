'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#features')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group relative rounded-xl px-4 py-2 text-sm font-medium text-slate-copy transition-colors duration-200 hover:text-ink"
                  >
                    <span className={isActive ? 'text-ink' : undefined}>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-rose transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            className="rounded-xl text-ink hover:bg-[#f8fafc] hover:text-ink"
          >
            Sign in
          </Button>
          <Button className="rounded-xl bg-ink px-5 text-white transition-all duration-200 hover:-translate-y-px hover:bg-ink-hover hover:shadow-md hover:shadow-ink/20">
            Get started
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex size-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-[#f8fafc] md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-slate-200/70 bg-white px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActive(link.href)
                    setOpen(false)
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-[#f8fafc]"
                >
                  {link.label}
                  {active === link.href && <span className="size-1.5 rounded-full bg-rose" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-xl border-slate-200 text-ink">
              Sign in
            </Button>
            <Button className="rounded-xl bg-ink text-white hover:bg-ink-hover">Get started</Button>
          </div>
        </nav>
      )}
    </header>
  )
}
