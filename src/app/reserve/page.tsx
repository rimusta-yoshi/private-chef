import type { Metadata } from "next"
import { ReserveForm } from "@/components/ReserveForm"

export const metadata: Metadata = {
  title: "Reserve an Evening | Plated & Private",
}

export default function ReservePage() {
  return <ReserveForm />
}
