import type { Metadata } from "next"
import "./globals.css"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Plated & Private | Private Chef, Fine Dining at Home",
  description:
    "Fine dining, brought to your table. A seasonal tasting menu, cooked live by two private chefs, in your home.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-accent="brass" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
