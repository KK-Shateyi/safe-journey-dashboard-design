import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Stats } from '@/components/landing/stats'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <Stats />
      </main>
      <SiteFooter />
    </div>
  )
}
