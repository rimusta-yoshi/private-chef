import { Button } from "@/components/ds/Button"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { RuleMark } from "@/components/ds/RuleMark"
import { Card } from "@/components/ds/Card"
import { Badge } from "@/components/ds/Badge"
import { PhotoFrame } from "@/components/ds/PhotoFrame"

const TIERS = [
  { name: "The Two", tagline: "For couples & quiet celebrations", price: "from £140", unit: "per guest" },
  { name: "The Table", tagline: "For groups & gatherings", price: "£150", unit: "per guest", featured: true },
  { name: "Bespoke", tagline: "Composed around you", price: "On enquiry", unit: "" },
]

const PILLARS: [string, string][] = [
  ["Seasonal", "The menu follows the season and the morning market, not a fixed card."],
  ["At home", "We bring the kitchen to you — your home, your table, your evening."],
  ["Cooked live", "Two chefs cook and plate every course in front of you, one by one."],
]

function Hero() {
  return (
    <header
      className="relative overflow-hidden px-5 py-24 text-center text-[var(--text-on-dark)] md:px-14 md:py-44"
      style={{
        background:
          "linear-gradient(rgba(20,16,13,0.74), rgba(20,16,13,0.86)), url(/assets/dish-trio.jpg) center/cover no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[820px]">
        <Eyebrow tone="onDark">Private chef · Fine dining at home</Eyebrow>
        <h1 className="mt-[22px] text-[clamp(2.75rem,6vw,5rem)] font-medium text-[var(--paper)]">
          Fine dining,
          <br />
          <span className="text-[var(--accent-tint)]">brought to your table.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] font-sans text-base leading-[1.7] text-[rgba(246,241,231,0.74)] md:text-lg">
          A seasonal tasting menu, cooked live by two private chefs — in your home, for your guests, on your
          evening.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
          <Button variant="accent" size="lg" block href="/reserve" className="md:w-auto">
            Reserve an evening
          </Button>
          <Button variant="secondary" size="lg" onDark block href="/menu" className="md:w-auto">
            View the menus
          </Button>
        </div>
      </div>
    </header>
  )
}

function Section({
  children,
  tone = "page",
}: {
  children: React.ReactNode
  tone?: "page" | "sunken" | "card"
}) {
  const bg =
    tone === "sunken" ? "bg-[var(--surface-sunken)]" : tone === "card" ? "bg-[var(--surface-card)]" : "bg-[var(--surface-page)]"
  return (
    <section className={`${bg} px-5 py-16 md:px-14 md:py-[140px]`}>
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />

      <Section>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>The Experience</Eyebrow>
          <h2 className="mt-[18px] mb-[22px] text-[clamp(2rem,4vw,3.25rem)]">
            A restaurant-grade kitchen, brought to your table
          </h2>
          <p className="prose mx-auto text-lg text-[var(--text-muted)]">
            Two private chefs arrive with the menu, cook it live in front of your guests, and plate every course at
            your table — fine dining, in the comfort of your own home.
          </p>
          <div className="mt-9">
            <RuleMark />
          </div>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
          {PILLARS.map(([title, desc]) => (
            <div key={title} className="text-center">
              <h3 className="text-2xl">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-[var(--text-muted)]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sunken">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow>The Menus</Eyebrow>
          <h2 className="my-4 text-[clamp(1.9rem,3.2vw,2.75rem)]">Three ways to dine</h2>
          <p className="text-base leading-[1.7] text-[var(--text-muted)]">
            Two set tasting menus, or a bespoke evening composed entirely around you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Card key={tier.name} interactive tone={tier.featured ? "inverse" : "raised"} padding="lg" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <Eyebrow tone={tier.featured ? "onDark" : "accent"}>{tier.tagline}</Eyebrow>
                {tier.featured && <Badge tone="brass">Signature</Badge>}
              </div>
              <h3 className={`text-3xl ${tier.featured ? "text-[var(--paper)]" : "text-[var(--text-strong)]"}`}>
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-display text-[26px] ${tier.featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"}`}
                >
                  {tier.price}
                </span>
                {tier.unit && (
                  <span
                    className={`text-xs uppercase tracking-[0.1em] ${tier.featured ? "text-[rgba(246,241,231,0.6)]" : "text-[var(--text-muted)]"}`}
                  >
                    {tier.unit}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-11 text-center">
          <Button variant="primary" href="/menu" trailing={<span>→</span>}>
            See all three menus
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-2 md:gap-[72px]">
          <PhotoFrame height={320} caption="Drop chefs portrait" className="md:h-[440px]" />
          <div>
            <Eyebrow>Your Chefs</Eyebrow>
            <h2 className="my-4 text-[clamp(1.9rem,3.2vw,2.75rem)]">The two at your table</h2>
            <p className="text-base leading-[1.75] text-[var(--text-muted)]">
              Trained across restaurant kitchens at home and abroad, the two of us cook a quiet, produce-led menu
              that changes with the season. We shop the morning of, cook live at your table, and pour the wine
              ourselves.
            </p>
            <div className="mt-7">
              <RuleMark align="left" />
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-[var(--ink-900)] px-5 py-20 text-center text-[var(--text-on-dark)] md:px-14 md:py-[150px]">
        <div className="mx-auto max-w-[820px]">
          <RuleMark tone="onDark" />
          <blockquote className="my-8 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-[1.35] text-[var(--paper)]">
            “The most considered meal we&apos;ve had in years. It felt less like a restaurant and more like being cooked
            for by someone who truly cared.”
          </blockquote>
          <div className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--accent-tint)]">
            An anniversary at home · Spring
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow>Reservations</Eyebrow>
          <h2 className="my-4 text-[clamp(2rem,4vw,3.25rem)]">Reserve your evening</h2>
          <p className="mb-[34px] text-[17px] leading-[1.7] text-[var(--text-muted)]">
            We take a limited number of evenings each month. Tell us your date and we&apos;ll confirm within a day.
          </p>
          <Button variant="accent" size="lg" href="/reserve">
            Reserve an evening
          </Button>
        </div>
      </Section>
    </div>
  )
}
