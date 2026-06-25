import Link from "next/link"
import Image from "next/image"
import { RuleMark } from "@/components/ds/RuleMark"

export function Footer() {
  return (
    <footer className="bg-[var(--ink-900)] px-5 pb-10 pt-14 text-[rgba(246,241,231,0.7)] md:px-14 md:pt-22">
      <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
        <div>
          <div className="mb-[18px] flex items-center gap-3">
            <Image src="/assets/logomark-paper.svg" alt="" width={34} height={34} />
            <div>
              <div className="font-display text-xl text-[var(--paper)]">
                Plated <span className="text-[var(--accent-tint)]">&amp;</span> Private
              </div>
              <div className="mt-[3px] text-[8.5px] uppercase tracking-[0.36em] text-[rgba(246,241,231,0.6)]">
                Private Chef
              </div>
            </div>
          </div>
          <p className="max-w-[300px] text-sm leading-[1.7]">
            Fine dining brought to your table. Seasonal tasting menus, cooked live by two private chefs, in your
            home or ours.
          </p>
        </div>
        <div>
          <div className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--accent-tint)]">
            Visit
          </div>
          <Link href="/#menus-teaser" className="block py-1.5 text-sm text-[rgba(246,241,231,0.7)] no-underline">
            The Menu
          </Link>
          <Link href="/story" className="block py-1.5 text-sm text-[rgba(246,241,231,0.7)] no-underline">
            Our Story
          </Link>
          <Link href="/reserve" className="block py-1.5 text-sm text-[rgba(246,241,231,0.7)] no-underline">
            Reserve
          </Link>
        </div>
        <div>
          <div className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--accent-tint)]">
            Enquiries
          </div>
          <a
            href="mailto:hello@platedandprivate.com"
            className="block py-1.5 text-sm text-[rgba(246,241,231,0.7)] no-underline"
          >
            hello@platedandprivate.com
          </a>
          <span className="block py-1.5 text-sm">+44 1603 000 000</span>
          <span className="block py-1.5 text-sm">Norwich, Norfolk</span>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1100px]">
        <RuleMark tone="onDark" align="left" />
        <div className="mt-5 text-xs tracking-[0.04em] text-[rgba(246,241,231,0.5)]">
          © Plated &amp; Private · Private chef, fine dining at home
        </div>
      </div>
    </footer>
  )
}
