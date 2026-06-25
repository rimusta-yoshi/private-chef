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

  function getInitialIndex() {
    if (typeof window === "undefined") return 0
    return Math.max(0, tiers.findIndex((tier) => tier.id === window.location.hash.replace("#", "")))
  }

  const [active, setActive] = useState(getInitialIndex)

  useEffect(() => {
    if (active > 0) {
      panelRefs.current[active]?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Card tone={tier.featured ? "inverse" : "raised"} padding="lg">
              <div className="mb-3.5 flex items-center gap-3">
                <Eyebrow tone={tier.featured ? "onDark" : "accent"}>{tier.tagline}</Eyebrow>
                {tier.featured && <Badge tone="brass">Signature</Badge>}
              </div>
              <h2 className={`mb-4 text-[2.2rem] ${tier.featured ? "text-[var(--paper)]" : ""}`}>{tier.name}</h2>
              <div className="mb-[18px] flex items-baseline gap-2.5">
                <span
                  className={`font-display text-[30px] ${tier.featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"}`}
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
                className={`mb-7 text-base leading-[1.7] ${tier.featured ? "text-[rgba(246,241,231,0.74)]" : "text-[var(--text-muted)]"}`}
              >
                {tier.desc}
              </p>
              <div className={`mb-2 border-t ${tier.featured ? "border-white/14" : "border-[var(--line)]"}`} />
              {tier.courses ? (
                <CoursePlaceholders count={tier.courses} featured={tier.featured} />
              ) : (
                <BespokeCanvas featured={tier.featured} />
              )}
              <div className="mt-7">
                <Button variant={tier.featured ? "accent" : "primary"} size="lg" href="/reserve" block>
                  {tier.cta}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
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
