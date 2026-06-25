import type { Metadata } from "next"
import "./globals.css"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://private-chef-rouge.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plated & Private | Private Chef in Norwich, Norfolk",
    template: "%s | Plated & Private",
  },
  description:
    "Fine dining, brought to your table. A seasonal tasting menu, cooked live by two private chefs, in your home — serving Norwich and across Norfolk.",
  keywords: [
    "private chef Norwich",
    "private chef Norfolk",
    "private dining Norwich",
    "tasting menu at home Norfolk",
    "hire a private chef Norwich",
  ],
  openGraph: {
    title: "Plated & Private | Private Chef in Norwich, Norfolk",
    description:
      "Fine dining, brought to your table. A seasonal tasting menu, cooked live by two private chefs, in your home — serving Norwich and across Norfolk.",
    url: siteUrl,
    siteName: "Plated & Private",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plated & Private | Private Chef in Norwich, Norfolk",
    description: "Fine dining, brought to your table. Cooked live by two private chefs, in your home.",
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Plated & Private",
  description:
    "A private chef service offering seasonal tasting menus cooked live at your table, serving Norwich and across Norfolk.",
  url: siteUrl,
  email: "hello@platedandprivate.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Norwich",
    addressRegion: "Norfolk",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "City",
    name: "Norwich",
  },
  servesCuisine: "Tasting menu",
  priceRange: "££££",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-accent="brass" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
