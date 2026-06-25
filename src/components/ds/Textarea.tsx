import { TextareaHTMLAttributes } from "react"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, id, rows = 4, className = "", ...rest }: TextareaProps) {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-")
  return (
    <label htmlFor={fieldId} className="flex flex-col gap-2 font-sans">
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {label}
        </span>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        className={`w-full resize-y rounded-[var(--radius-xs)] border bg-[var(--surface-card)] px-[15px] py-[13px] font-sans text-[15px] leading-[1.55] text-[var(--text-strong)] outline-none transition-[border-color,box-shadow] duration-[var(--dur-base)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] ${error ? "border-[var(--critical)]" : "border-[var(--line-strong)]"} ${className}`}
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
