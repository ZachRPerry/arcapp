import { Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultCardProps {
  label: string
  title: string
  subtitle?: string
  subtitleTagClassName?: string
  badgeText?: string
  badgeClassName?: string
  isSpinning?: boolean
  lockable?: boolean
  isLocked?: boolean
  onToggleLock?: () => void
  imageSrc: string
  imageAlt: string
  imageClassName: string
  imageFallback: string
  imageBackground?: string
  titleColor?: string
}

export function ResultCard({
  label,
  title,
  subtitle,
  subtitleTagClassName,
  badgeText,
  badgeClassName,
  isSpinning = false,
  lockable = false,
  isLocked = false,
  onToggleLock,
  imageSrc,
  imageAlt,
  imageClassName,
  imageFallback,
  imageBackground,
  titleColor = "var(--color-primary)",
}: ResultCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border border-primary/55 bg-card/90 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)]",
        isSpinning && "ring-1 ring-primary/35"
      )}
    >
      {lockable && onToggleLock && (
        <button
          type="button"
          aria-pressed={isLocked}
          aria-label={isLocked ? "Unlock result" : "Lock result"}
          onClick={onToggleLock}
          className={cn(
            "absolute top-3 right-3 z-20 inline-flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors",
            isLocked
              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]"
              : "border-border/80 border-dashed bg-card/45 text-foreground/85 hover:border-primary/60 hover:text-foreground"
          )}
        >
          {isLocked ? <Lock className="size-4" /> : <Unlock className="size-4" />}
        </button>
      )}
      <div className="relative h-40 w-full border-b border-border/80 sm:h-48" style={{ backgroundImage: imageBackground }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={imageClassName}
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = imageFallback
          }}
        />
        {isSpinning && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 animate-[slot-scan_0.9s_linear_infinite] bg-gradient-to-b from-primary/25 to-transparent" />
        )}
      </div>
      <div className="flex min-h-[8.75rem] flex-col gap-0 p-4 sm:min-h-[9.5rem] sm:p-5">
        <div className="flex min-h-5 items-center justify-between gap-2">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">{label}</p>
        </div>
        <div className="flex min-h-[1.75rem] flex-wrap items-start gap-2">
          {subtitle && (
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-secondary-foreground",
                subtitleTagClassName
              )}
            >
              {subtitle}
            </span>
          )}
          {badgeText && (
            <span className={badgeClassName}>{badgeText}</span>
          )}
        </div>
        <p className="min-h-[3.5rem] overflow-hidden text-2xl leading-tight font-black tracking-wide uppercase line-clamp-2 sm:min-h-[4rem] sm:text-3xl" style={{ color: titleColor }}>
          {title}
        </p>
      </div>
    </article>
  )
}
