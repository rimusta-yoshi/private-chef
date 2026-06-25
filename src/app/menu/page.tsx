import type { Metadata } from "next"
import { PageHead } from "@/components/PageHead"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { RuleMark } from "@/components/ds/RuleMark"
import { Button } from "@/components/ds/Button"
import { Card } from "@/components/ds/Card"
import { Badge } from "@/components/ds/Badge"
import { CoursePlaceholders, BespokeCanvas } from "@/components/menu/CourseList"
import { MenuCarousel } from "@/components/menu/MenuCarousel"
import { TIERS, type Tier } from "@/lib/menu-tiers"

export const metadata: Metadata = {
  title: "The Menus",
  description:
    "Three ways to dine with Plated & Private: The Two, The Table, and a fully Bespoke menu — seasonal tasting menus cooked live at your table in Norwich and across Norfolk.",
}

function TierRow({ tier, flip }: { tier: Tier; flip?: boolean }) {
  const intro = (
    <div className="self-center">
      <div className="mb-3.5 flex items-center gap-3">
        <Eyebrow>{tier.tagline}</Eyebrow>
        {tier.featured && <Badge tone="brass">Signature</Badge>}
      </div>
      <h2 className="mb-4 text-[clamp(2.2rem,4vw,3.25rem)]">{tier.name}</h2>
      <div className="mb-[18px] flex items-baseline gap-2.5">
        <span className="font-display text-[30px] text-[var(--accent-strong)]">{tier.price}</span>
        {tier.unit && (
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{tier.unit}</span>
        )}
      </div>
      <p className="mb-7 max-w-[420px] text-base leading-[1.7] text-[var(--text-muted)]">{tier.desc}</p>
      <Button variant={tier.featured ? "accent" : "secondary"} size="lg" href="/reserve">
        {tier.cta}
      </Button>
    </div>
  )

  const panel = (
    <Card tone={tier.featured ? "inverse" : "raised"} padding="lg">
      {tier.courses ? <CoursePlaceholders count={tier.courses} featured={tier.featured} /> : <BespokeCanvas />}
    </Card>
  )

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-[72px]">
      {flip ? (
        <>
          <div className="md:order-2">{intro}</div>
          <div className="md:order-1">{panel}</div>
        </>
      ) : (
        <>
          {intro}
          {panel}
        </>
      )}
    </div>
  )
}

export default function MenuPage() {
  return (
    <div>
      <PageHead
        kicker="The Menus"
        title="Three ways to dine"
        lead="Two set tasting menus and a bespoke evening — each cooked live by two private chefs, in your home. Dishes are composed around the season and shared closer to your evening."
      />

      <section className="py-12 md:hidden">
        <MenuCarousel tiers={TIERS} />
      </section>

      <section className="mx-auto hidden max-w-[1100px] px-14 py-24 md:block">
        {TIERS.map((tier, i) => (
          <div key={tier.id} id={tier.id} className="scroll-mt-24">
            <TierRow tier={tier} flip={i % 2 === 1} />
            {i < TIERS.length - 1 && (
              <div className="my-21">
                <RuleMark />
              </div>
            )}
          </div>
        ))}

        <div className="mt-21">
          <RuleMark tone="line" />
        </div>
        <p className="mx-auto mt-7 max-w-[560px] text-center text-[13px] leading-[1.8] text-[var(--text-subtle)]">
          An optional wine pairing is available with every menu. Vegetarian, pescatarian and other dietary menus
          are composed on request; allergies are noted at booking and accommodated wherever possible.
        </p>
      </section>

      <p className="mx-auto mt-2 max-w-[560px] px-5 pb-12 text-center text-[13px] leading-[1.8] text-[var(--text-subtle)] md:hidden">
        An optional wine pairing is available with every menu. Vegetarian, pescatarian and other dietary menus are
        composed on request; allergies are noted at booking and accommodated wherever possible.
      </p>
    </div>
  )
}
