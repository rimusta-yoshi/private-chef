import type { Metadata } from "next"
import { PageHead } from "@/components/PageHead"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { RuleMark } from "@/components/ds/RuleMark"
import { PhotoFrame } from "@/components/ds/PhotoFrame"

export const metadata: Metadata = {
  title: "Our Story | Plated & Private",
}

const PILLARS: [string, string][] = [
  ["The season first", "Each menu is composed around what the season is quietly offering, the week of."],
  ["Cooked live", "Every course is plated and served the few steps from our kitchen to your table."],
  ["Wine, poured by hand", "An optional pairing is chosen to follow the menu and poured through the evening."],
]

export default function StoryPage() {
  return (
    <div>
      <PageHead
        kicker="Our Story"
        title="Fine dining, brought home"
        lead="How two chefs set out to bring the restaurant tasting menu into the dining room."
      />

      <section className="px-5 py-14 md:px-14 md:py-[110px]">
        <div className="prose mx-auto text-lg leading-[1.85] text-[var(--text-body)]">
          <p className="mb-7">
            Plated &amp; Private began with a simple frustration: the best meals were always the quietest ones —
            cooked unhurriedly, for a handful of people, by someone paying attention. Rarely a restaurant; more
            often a kitchen full of friends.
          </p>
          <p className="mb-7">
            So we brought the restaurant to the room instead. Two chefs, one seasonal tasting menu, cooked live at
            your table — in your home, for your guests, on your evening. No second sitting, no rush to turn a
            room. Just dinner, given its full attention.
          </p>
        </div>

        <div className="mx-auto my-14 max-w-[1000px]">
          <PhotoFrame src="/assets/dish-trio.jpg" height={420} caption="Drop kitchen / room photography" />
        </div>

        <div className="mx-auto max-w-[1000px]">
          <div className="mb-12 mt-2">
            <RuleMark />
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-10">
            {PILLARS.map(([title, desc]) => (
              <div key={title}>
                <Eyebrow>{title}</Eyebrow>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
