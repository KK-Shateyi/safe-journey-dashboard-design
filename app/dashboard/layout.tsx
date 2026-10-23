import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SmartCalc Toolkit',
  description:
    'Safe Journey — a discreet personal safety dashboard with smart routes, live tracking, SOS and verified local support.',
}

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
