type RuleMarkProps = {
  tone?: "accent" | "line" | "onDark"
  align?: "center" | "left"
  className?: string
}

const TONES: Record<string, string> = {
  accent: "text-[var(--accent)]",
  line: "text-[var(--line-strong)]",
  onDark: "text-[var(--accent-tint)]",
}

export function RuleMark({ tone = "accent", align = "center", className = "" }: RuleMarkProps) {
  return (
    <div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"} ${TONES[tone]} ${className}`}
    >
      <span className="h-px w-[clamp(28px,6vw,72px)] bg-current opacity-55" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      {align === "center" && <span className="h-px w-[clamp(28px,6vw,72px)] bg-current opacity-55" />}
    </div>
  )
}
