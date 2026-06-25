import Link from "next/link"

type Variant = "primary" | "accent" | "secondary" | "ghost"
type Size = "sm" | "md" | "lg"

type ButtonProps = {
  variant?: Variant
  size?: Size
  href?: string
  type?: "button" | "submit"
  disabled?: boolean
  block?: boolean
  onDark?: boolean
  trailing?: React.ReactNode
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const SIZES: Record<Size, string> = {
  sm: "px-[18px] py-2 text-[11px] tracking-[0.16em]",
  md: "px-7 py-[13px] text-xs tracking-[0.18em]",
  lg: "px-[38px] py-[17px] text-[13px] tracking-[0.2em]",
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-[var(--ink-900)] text-[var(--text-on-dark)] border border-[var(--ink-900)] hover:bg-[var(--ink-700)]",
  accent: "bg-[var(--accent)] text-[var(--text-on-accent)] border border-[var(--accent)] hover:bg-[var(--accent-hover)]",
  secondary:
    "bg-transparent border border-[var(--line-strong)] text-[var(--text-strong)] hover:bg-[var(--paper-sunken)] hover:border-[var(--ink-900)]",
  ghost: "bg-transparent border border-transparent text-[var(--text-strong)] hover:bg-[var(--paper-sunken)]",
}

const VARIANTS_ON_DARK: Record<Variant, string> = {
  primary: VARIANTS.primary,
  accent: VARIANTS.accent,
  secondary:
    "bg-transparent border border-white/40 text-[var(--paper)] hover:bg-white/8 hover:border-[var(--paper)]",
  ghost: "bg-transparent border border-transparent text-[var(--paper)] hover:bg-white/8",
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  block = false,
  onDark = false,
  trailing,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const palette = onDark ? VARIANTS_ON_DARK : VARIANTS
  const classes = `inline-flex items-center justify-center gap-2.5 font-sans font-medium uppercase no-underline leading-none whitespace-nowrap rounded-[var(--radius-xs)] cursor-pointer transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed ${block ? "w-full" : "w-auto"} ${SIZES[size]} ${palette[variant]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {trailing}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick}>
      {content}
    </button>
  )
}
