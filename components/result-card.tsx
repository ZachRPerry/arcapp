interface ResultCardProps {
  label: string
  title: string
  subtitle: string
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
  imageSrc,
  imageAlt,
  imageClassName,
  imageFallback,
  imageBackground,
  titleColor = "var(--color-primary)",
}: ResultCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-primary/55 bg-card/90 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)]">
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
      </div>
      <div className="flex flex-col gap-1 p-4 sm:p-5">
        <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">{label}</p>
        <p className="text-2xl font-black tracking-wide uppercase sm:text-3xl" style={{ color: titleColor }}>
          {title}
        </p>
        <p className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{subtitle}</p>
      </div>
    </article>
  )
}
