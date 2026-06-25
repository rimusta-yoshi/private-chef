"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ds/Button"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "The Menus" },
  { href: "/story", label: "Our Story" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const brand = (
    <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
      <Image src="/assets/logomark.svg" alt="" width={34} height={34} />
      <div>
        <div className="font-display text-xl leading-none tracking-[0.02em] text-[var(--text-strong)]">
          Plated <span className="text-[var(--accent)]">&amp;</span> Private
        </div>
        <div className="mt-[3px] font-sans text-[8.5px] uppercase tracking-[0.36em] text-[var(--text-muted)]">
          Private Chef
        </div>
      </div>
    </Link>
  )

  return (
    <>
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--line)] bg-[rgba(246,241,231,0.86)] px-5 py-4 backdrop-blur-md md:px-14 md:py-5">
        {brand}

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-xs font-medium uppercase tracking-[0.18em] ${active ? "text-[var(--text-strong)]" : "text-[var(--text-muted)]"}`}
              >
                {link.label}
                {active && <span className="absolute -bottom-[7px] left-0 right-0 h-px bg-[var(--accent)]" />}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Button size="sm" variant="accent" href="/reserve">
            Reserve
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[var(--text-strong)] md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-60 flex flex-col bg-[var(--surface-page)] md:hidden">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
            {brand}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[var(--text-strong)]"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-1 flex-col px-6 pb-10 pt-2">
            <div className="flex flex-col">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-[var(--line)] py-[22px] font-display text-3xl ${pathname === link.href ? "text-[var(--accent-strong)]" : "text-[var(--text-strong)]"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-8">
              <Button size="lg" variant="accent" block href="/reserve">
                Reserve an evening
              </Button>
              <div className="mt-[22px]">
                <a
                  href="mailto:hello@platedandprivate.com"
                  className="font-sans text-sm text-[var(--text-muted)] no-underline"
                >
                  hello@platedandprivate.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
