import type { Metadata } from "next"
import { PageHead } from "@/components/PageHead"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { RuleMark } from "@/components/ds/RuleMark"
import { Button } from "@/components/ds/Button"
import { Card } from "@/components/ds/Card"
import { Badge } from "@/components/ds/Badge"

export const metadata: Metadata = {
  title: "The Menus",
  description:
    "Three ways to dine with Plated & Private: The Two, The Table, and a fully Bespoke menu — seasonal tasting menus cooked live at your table in Norwich and across Norfolk.",
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"]

type Tier = {
  id: string
  name: string
  tagline: string
  price: string
  unit: string
  desc: string
  courses: number | null
  cta: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    id: "two",
    name: "The Two",
    tagline: "For couples & quiet celebrations",
    price: "from £140",
    unit: "per guest",
    desc: "A set tasting menu for two — an intimate evening, cooked live at your table for a romantic occasion.",
    courses: 5,
    cta: "Reserve The Two",
  },
  {
    id: "table",
    name: "The Table",
    tagline: "For groups & gatherings",
    price: "£150",
    unit: "per guest",
    desc: "Our signature set tasting menu — six seasonal courses, cooked live for your table of guests.",
    courses: 6,
    cta: "Reserve The Table",
    featured: true,
  },
  {
    id: "bespoke",
    name: "Bespoke",
    tagline: "Composed entirely around you",
    price: "Price on enquiry",
    unit: "",
    desc: "A menu built from the ground up — courses, wines and pacing of your choosing, for any occasion.",
    courses: null,
    cta: "Enquire about Bespoke",
  },
]

function CoursePlaceholders({ count, featured }: { count: number; featured?: boolean }) {
  const ink = featured ? "text-[var(--paper)]" : "text-[var(--text-strong)]"
  const muted = featured ? "text-[rgba(246,241,231,0.55)]" : "text-[var(--text-subtle)]"
  const line = featured ? "border-white/14" : "border-[var(--line)]"
  const num = featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"
  return (
    <ol className="m-0 list-none p-0">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className={`flex items-baseline gap-[18px] py-4 ${i === 0 ? "" : `border-t ${line}`}`}
        >
          <span className={`w-7 flex-none font-display text-xl italic ${num}`}>{ROMAN[i]}</span>
          <span className="flex flex-col gap-1">
            <span className={`font-display text-[21px] ${ink}`}>Course {ROMAN[i]}</span>
            <span className={`font-sans text-[12.5px] tracking-[0.04em] ${muted}`}>
              Seasonal — composed closer to your evening
            </span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function BespokeCanvas() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {["Choose your courses", "Choose your wines", "Choose your pace"].map((t, i) => (
        <div
          key={t}
          className={`flex items-baseline gap-[18px] py-4 ${i === 0 ? "" : "border-t border-[var(--line)]"}`}
        >
          <span className="w-7 flex-none font-display text-xl italic text-[var(--accent-strong)]">{ROMAN[i]}</span>
          <span className="font-display text-[21px] text-[var(--text-strong)]">{t}</span>
        </div>
      ))}
    </div>
  )
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

      <section className="mx-auto max-w-[1100px] px-5 py-12 md:px-14 md:py-24">
        {TIERS.map((tier, i) => (
          <div key={tier.id} id={tier.id} className="scroll-mt-24">
            <TierRow tier={tier} flip={i % 2 === 1} />
            {i < TIERS.length - 1 && (
              <div className="my-12 md:my-21">
                <RuleMark />
              </div>
            )}
          </div>
        ))}

        <div className="mt-12 md:mt-21">
          <RuleMark tone="line" />
        </div>
        <p className="mx-auto mt-7 max-w-[560px] text-center text-[13px] leading-[1.8] text-[var(--text-subtle)]">
          An optional wine pairing is available with every menu. Vegetarian, pescatarian and other dietary menus
          are composed on request; allergies are noted at booking and accommodated wherever possible.
        </p>
      </section>
    </div>
  )
}
