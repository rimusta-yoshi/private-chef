"use client"

import { FormEvent, useState } from "react"
import { PageHead } from "@/components/PageHead"
import { Eyebrow } from "@/components/ds/Eyebrow"
import { RuleMark } from "@/components/ds/RuleMark"
import { Button } from "@/components/ds/Button"
import { Card } from "@/components/ds/Card"
import { Input } from "@/components/ds/Input"
import { Select } from "@/components/ds/Select"
import { Textarea } from "@/components/ds/Textarea"

const WHAT_TO_EXPECT: [string, string][] = [
  ["Two private chefs", "They arrive, cook live, and plate every course at your table."],
  ["Set or bespoke", "The Two, The Table, or a menu composed around you."],
  ["From £140 per guest", "Wine pairing optional; Bespoke priced on enquiry."],
  ["Confirmed in 24h", "We reply by email with your menu and next steps."],
]

export function ReserveForm() {
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const guestCount = parseInt(String(form.get("guests")), 10) || 2
    const winePairing = String(form.get("winePairing"))
    const notes = String(form.get("notes") || "")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          eventDate: form.get("eventDate"),
          guestCount,
          eventType: form.get("menu"),
          notes: `Wine pairing: ${winePairing}${notes ? `\n\n${notes}` : ""}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setDone(true)
    } catch {
      setError("Something went wrong submitting your request. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-5 py-14 md:px-14 md:py-24">
        <Card padding="lg" className="max-w-[540px] text-center">
          <RuleMark />
          <h2 className="my-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">Your request is in</h2>
          <p className="text-base leading-[1.7] text-[var(--text-muted)]">
            Thank you. We take a limited number of evenings each month and will confirm by email within 24 hours,
            with a note on your menu and the next steps.
          </p>
          <div className="mt-7">
            <Button variant="secondary" onClick={() => setDone(false)}>
              Make another request
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  return (
    <div>
      <PageHead
        kicker="Reservations"
        title="Reserve an evening"
        lead="Tell us a little about the evening you have in mind. There is no payment now — we confirm availability first."
      />

      <section className="px-5 py-12 md:px-14 md:py-24">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 items-start gap-7 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
            <Input name="name" label="Full name" placeholder="Your name" required />
            <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
            <Input name="eventDate" label="Preferred date" type="date" required />
            <Select
              name="menu"
              label="Menu"
              options={["The Two — from £140pp", "The Table — £150pp", "Bespoke — on enquiry"]}
              defaultValue="The Table — £150pp"
            />
            <Select name="guests" label="Guests" options={["2", "4", "6", "8", "10"]} defaultValue="6" />
            <Select
              name="winePairing"
              label="Wine pairing"
              options={["Yes, please", "No, thank you", "Decide later"]}
            />
            <div className="col-span-1 md:col-span-2">
              <Textarea name="notes" label="Anything we should know?" rows={4} placeholder="Allergies, celebrations, preferences…" />
            </div>
            <div className="col-span-1 flex flex-wrap items-center gap-4 md:col-span-2">
              <Button type="submit" variant="accent" size="lg" disabled={submitting} block className="md:w-auto">
                {submitting ? "Sending…" : "Request this evening"}
              </Button>
              <span className="text-xs text-[var(--text-subtle)]">No payment taken now.</span>
            </div>
            {error && <p className="col-span-1 text-sm text-[var(--critical)] md:col-span-2">{error}</p>}
          </form>

          <Card tone="inverse" padding="lg" className="order-first md:order-none">
            <Eyebrow tone="onDark">The evening</Eyebrow>
            <h3 className="my-3.5 text-2xl text-[var(--paper)]">What to expect</h3>
            <ul className="m-0 flex flex-col gap-4 p-0">
              {WHAT_TO_EXPECT.map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-none rotate-45 bg-[var(--accent-tint)]" />
                  <span>
                    <span className="block font-display text-[19px] text-[var(--paper)]">{title}</span>
                    <span className="text-sm text-[rgba(246,241,231,0.66)]">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
