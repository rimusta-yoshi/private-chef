type BadgeProps = {
  tone?: "neutral" | "brass" | "wine" | "olive"
  children: React.ReactNode
}

const TONES: Record<string, string> = {
  neutral: "bg-[var(--ink-900)] text-[var(--text-on-dark)]",
  brass: "bg-[var(--accent)] text-[var(--text-on-accent)]",
  wine: "bg-[var(--wine-700)] text-[var(--paper)]",
  olive: "bg-[var(--olive-600)] text-[var(--paper)]",
}

export function Badge({ tone = "brass", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-[11px] py-1.5 font-sans text-[10.5px] font-medium uppercase leading-none tracking-[0.14em] ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}
