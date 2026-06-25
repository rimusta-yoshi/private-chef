import Image from "next/image"

type PhotoFrameProps = {
  src?: string
  alt?: string
  height?: number
  caption?: string
  className?: string
}

export function PhotoFrame({ src, alt = "", height = 360, caption, className = "" }: PhotoFrameProps) {
  return (
    <div
      className={`relative block w-full overflow-hidden shadow-[var(--shadow-ring)] ${className}`}
      style={{ height }}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--paper-sunken)] px-4 text-center font-sans text-sm text-[var(--text-subtle)]">
          {caption || "Drop photography"}
        </div>
      )}
    </div>
  )
}
