import { SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  error?: string
  options: string[]
}

export function Select({ label, hint, error, id, options, className = "", ...rest }: SelectProps) {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-")
  return (
    <label htmlFor={fieldId} className="flex flex-col gap-2 font-sans">
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {label}
        </span>
      )}
      <span className="relative flex items-center">
        <select
          id={fieldId}
          className={`w-full cursor-pointer appearance-none rounded-[var(--radius-xs)] border bg-[var(--surface-card)] px-[15px] py-[13px] pr-10 font-sans text-[15px] text-[var(--text-strong)] outline-none transition-[border-color,box-shadow] duration-[var(--dur-base)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] ${error ? "border-[var(--critical)]" : "border-[var(--line-strong)]"} ${className}`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-[15px] text-xs text-[var(--accent-strong)]">▾</span>
      </span>
      {(error || hint) && (
        <span className={`text-xs ${error ? "text-[var(--critical)]" : "text-[var(--text-subtle)]"}`}>
          {error || hint}
        </span>
      )}
    </label>
  )
}
