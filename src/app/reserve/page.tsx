import type { Metadata } from "next"
import { ReserveForm } from "@/components/ReserveForm"

export const metadata: Metadata = {
  title: "Reserve an Evening",
  description:
    "Reserve a private chef evening in Norwich or anywhere in Norfolk. No payment now — we confirm availability first.",
}

export default function ReservePage() {
  return <ReserveForm />
}
