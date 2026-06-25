import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { Badge } from "@/components/ds/Badge"
import { Button } from "@/components/ds/Button"
import { CoursePlaceholders, BespokeCanvas } from "@/components/menu/CourseList"
import { TIERS } from "@/lib/menu-tiers"

export function generateStaticParams() {
  return TIERS.map((tier) => ({ tier: tier.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>
}): Promise<Metadata> {
  const { tier: tierId } = await params
  const tier = TIERS.find((t) => t.id === tierId)
  if (!tier) return {}
  return {
    title: tier.name,
    description: `${tier.name} — ${tier.desc}`,
  }
}

export default async function TierDetailPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: tierId } = await params
  const tier = TIERS.find((t) => t.id === tierId)
  if (!tier) notFound()

  return (
    <div className="flex min-h-[calc(100dvh-73px)] flex-col bg-[var(--ink-900)] md:min-h-[calc(100dvh-89px)]">
      <header className="px-5 pt-6 pb-10 text-[var(--paper)] md:px-14 md:pt-12">
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.16em] text-[rgba(246,241,231,0.6)] no-underline"
        >
          ← All menus
        </Link>
        <div className="mb-3 flex items-center gap-3">
          <Eyebrow tone="onDark">{tier.tagline}</Eyebrow>
          {tier.featured && <Badge tone="brass">Signature</Badge>}
        </div>
        <h1 className="mb-4 text-[clamp(2.25rem,6vw,3.5rem)] text-[var(--paper)]">{tier.name}</h1>
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl text-[var(--accent-tint)]">{tier.price}</span>
          {tier.unit && (
            <span className="text-xs uppercase tracking-[0.14em] text-[rgba(246,241,231,0.6)]">{tier.unit}</span>
          )}
        </div>
      </header>

      <div className="flex-1 bg-[var(--surface-page)] px-5 py-9 md:px-14 md:py-12">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-7 text-base leading-[1.7] text-[var(--text-muted)]">{tier.desc}</p>
          <div className="mb-1 border-t border-[var(--line)]" />
          {tier.courses ? <CoursePlaceholders count={tier.courses} /> : <BespokeCanvas />}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-[var(--line)] bg-[var(--surface-card)] px-5 py-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))] md:px-14">
        <div className="mx-auto max-w-[680px]">
          <Button variant={tier.featured ? "accent" : "primary"} size="lg" href="/reserve" block>
            {tier.cta}
          </Button>
        </div>
      </div>
    </div>
  )
}
