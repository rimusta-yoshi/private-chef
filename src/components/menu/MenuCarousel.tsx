"use client"

import { useEffect, useRef, useState } from "react"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { Button } from "@/components/ds/Button"
import { Card } from "@/components/ds/Card"
import { Badge } from "@/components/ds/Badge"
import { CoursePlaceholders, BespokeCanvas } from "@/components/menu/CourseList"
import type { Tier } from "@/lib/menu-tiers"

export function MenuCarousel({ tiers }: { tiers: Tier[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // Starts at 0 on both server and client so SSR markup matches on hydration;
  // the hash-deep-link jump happens after mount, once it's safe to read window.location.
  const [active, setActive] = useState(0)

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    const index = tiers.findIndex((tier) => tier.id === hash)
    if (index > 0) {
      panelRefs.current[index]?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" })
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL hash on mount
      setActive(index)
    }
  }, [tiers])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = panelRefs.current.findIndex((el) => el === visible.target)
        if (index !== -1) setActive(index)
      },
      { root: track, threshold: 0.6 },
    )

    panelRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [tiers.length])

  function goTo(index: number) {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            ref={(el) => {
              panelRefs.current[i] = el
            }}
            className="w-[calc(100%-2.5rem)] flex-none snap-center"
          >
            <Card tone={tier.featured ? "inverse" : "raised"} padding="md" className="flex max-h-[78vh] flex-col">
              <div className="mb-2.5 flex items-center gap-3">
                <Eyebrow tone={tier.featured ? "onDark" : "accent"}>{tier.tagline}</Eyebrow>
                {tier.featured && <Badge tone="brass">Signature</Badge>}
              </div>
              <h2 className={`mb-2.5 text-[1.875rem] ${tier.featured ? "text-[var(--paper)]" : ""}`}>{tier.name}</h2>
              <div className="mb-3 flex items-baseline gap-2.5">
                <span
                  className={`font-display text-2xl ${tier.featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"}`}
                >
                  {tier.price}
                </span>
                {tier.unit && (
                  <span
                    className={`text-xs uppercase tracking-[0.14em] ${tier.featured ? "text-[rgba(246,241,231,0.6)]" : "text-[var(--text-muted)]"}`}
                  >
                    {tier.unit}
                  </span>
                )}
              </div>
              <p
                className={`mb-4 text-sm leading-[1.6] ${tier.featured ? "text-[rgba(246,241,231,0.74)]" : "text-[var(--text-muted)]"}`}
              >
                {tier.desc}
              </p>
              <div className={`mb-1 border-t ${tier.featured ? "border-white/14" : "border-[var(--line)]"}`} />
              <div className="flex-1 overflow-y-auto">
                {tier.courses ? (
                  <CoursePlaceholders count={tier.courses} featured={tier.featured} compact />
                ) : (
                  <BespokeCanvas featured={tier.featured} compact />
                )}
              </div>
              <div className="mt-4 flex-none">
                <Button variant={tier.featured ? "accent" : "primary"} size="md" href="/reserve" block>
                  {tier.cta}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            type="button"
            aria-label={`Show ${tier.name}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] ${
              active === i ? "w-6 bg-[var(--accent)]" : "w-2 bg-[var(--line-strong)]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
