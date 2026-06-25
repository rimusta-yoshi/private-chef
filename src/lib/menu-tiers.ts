export type Tier = {
  id: string
  name: string
  tagline: string
  price: string
  unit: string
  desc: string
  courses: number | null
  cta: string
  featured?: boolean
}

export const TIERS: Tier[] = [
  {
    id: "two",
    name: "The Two",
    tagline: "For couples & quiet celebrations",
    price: "from £140",
    unit: "per guest",
    desc: "A set tasting menu for two — an intimate evening, cooked live at your table for a romantic occasion.",
    courses: 5,
    cta: "Reserve The Two",
  },
  {
    id: "table",
    name: "The Table",
    tagline: "For groups & gatherings",
    price: "£150",
    unit: "per guest",
    desc: "Our signature set tasting menu — six seasonal courses, cooked live for your table of guests.",
    courses: 6,
    cta: "Reserve The Table",
    featured: true,
  },
  {
    id: "bespoke",
    name: "Bespoke",
    tagline: "Composed entirely around you",
    price: "Price on enquiry",
    unit: "",
    desc: "A menu built from the ground up — courses, wines and pacing of your choosing, for any occasion.",
    courses: null,
    cta: "Enquire about Bespoke",
  },
]
