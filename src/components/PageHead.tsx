import { Eyebrow } from "@/components/ds/Eyebrow"

type PageHeadProps = {
  kicker: string
  title: string
  lead?: string
}

export function PageHead({ kicker, title, lead }: PageHeadProps) {
  return (
    <section className="bg-[var(--ink-900)] px-5 py-16 pb-12 text-center text-[var(--paper)] md:px-14 md:py-[120px] md:pb-[90px]">
      <Eyebrow tone="onDark">{kicker}</Eyebrow>
      <h1 className="mt-[18px] text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium text-[var(--paper)]">{title}</h1>
      {lead && (
        <p className="mx-auto mt-[22px] max-w-[560px] font-sans text-[17px] leading-[1.7] text-[rgba(246,241,231,0.72)]">
          {lead}
        </p>
      )}
    </section>
  )
}
