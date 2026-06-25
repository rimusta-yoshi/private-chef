import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, className = "", ...rest }: InputProps) {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-")
  return (
    <label htmlFor={fieldId} className="flex flex-col gap-2 font-sans">
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {label}
        </span>
      )}
      <input
        id={fieldId}
        className={`w-full rounded-[var(--radius-xs)] border bg-[var(--surface-card)] px-[15px] py-[13px] font-sans text-[15px] text-[var(--text-strong)] outline-none transition-[border-color,box-shadow] duration-[var(--dur-base)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] ${error ? "border-[var(--critical)]" : "border-[var(--line-strong)]"} ${className}`}
        {...rest}
      />
      {(error || hint) && (
        <span className={`text-xs ${error ? "text-[var(--critical)]" : "text-[var(--text-subtle)]"}`}>
          {error || hint}
        </span>
      )}
    </label>
  )
}
