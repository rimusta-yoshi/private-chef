const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"]

export function CoursePlaceholders({ count, featured }: { count: number; featured?: boolean }) {
  const ink = featured ? "text-[var(--paper)]" : "text-[var(--text-strong)]"
  const muted = featured ? "text-[rgba(246,241,231,0.55)]" : "text-[var(--text-subtle)]"
  const line = featured ? "border-white/14" : "border-[var(--line)]"
  const num = featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"
  return (
    <ol className="m-0 list-none p-0">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className={`flex items-baseline gap-[18px] py-4 ${i === 0 ? "" : `border-t ${line}`}`}>
          <span className={`w-7 flex-none font-display text-xl italic ${num}`}>{ROMAN[i]}</span>
          <span className="flex flex-col gap-1">
            <span className={`font-display text-[21px] ${ink}`}>Course {ROMAN[i]}</span>
            <span className={`font-sans text-[12.5px] tracking-[0.04em] ${muted}`}>
              Seasonal — composed closer to your evening
            </span>
          </span>
        </li>
      ))}
    </ol>
  )
}

export function BespokeCanvas({ featured }: { featured?: boolean }) {
  const ink = featured ? "text-[var(--paper)]" : "text-[var(--text-strong)]"
  const line = featured ? "border-white/14" : "border-[var(--line)]"
  const num = featured ? "text-[var(--accent-tint)]" : "text-[var(--accent-strong)]"
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {["Choose your courses", "Choose your wines", "Choose your pace"].map((t, i) => (
        <div key={t} className={`flex items-baseline gap-[18px] py-4 ${i === 0 ? "" : `border-t ${line}`}`}>
          <span className={`w-7 flex-none font-display text-xl italic ${num}`}>{ROMAN[i]}</span>
          <span className={`font-display text-[21px] ${ink}`}>{t}</span>
        </div>
      ))}
    </div>
  )
}
