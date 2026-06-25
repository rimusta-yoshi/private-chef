type EyebrowProps = {
  tone?: "accent" | "muted" | "onDark"
  children: React.ReactNode
  className?: string
}

const TONES: Record<string, string> = {
  accent: "text-[var(--accent-strong)]",
  muted: "text-[var(--text-muted)]",
  onDark: "text-[var(--accent-tint)]",
}

export function Eyebrow({ tone = "accent", children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`font-sans text-xs font-medium uppercase tracking-[0.22em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
