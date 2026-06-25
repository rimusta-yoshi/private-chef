type CardProps = {
  tone?: "raised" | "sunken" | "inverse"
  padding?: "none" | "sm" | "md" | "lg"
  interactive?: boolean
  children: React.ReactNode
  className?: string
}

const PADDING: Record<string, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-12",
}

const TONES: Record<string, string> = {
  raised: "bg-[var(--surface-card)] text-[var(--text-body)] border-[var(--line)]",
  sunken: "bg-[var(--surface-sunken)] text-[var(--text-body)] border-[var(--line)]",
  inverse: "bg-[var(--ink-900)] text-[var(--text-on-dark)] border-white/12",
}

export function Card({ tone = "raised", padding = "md", interactive = false, children, className = "" }: CardProps) {
  return (
    <div
      className={`box-border rounded-[var(--radius-card)] border shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] ${interactive ? "cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5" : ""} ${PADDING[padding]} ${TONES[tone]} ${className}`}
    >
      {children}
    </div>
  )
}
