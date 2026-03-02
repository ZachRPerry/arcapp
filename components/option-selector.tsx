"use client"

import { Crosshair, Map, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export type SpinOption = "gunLoadout" | "map" | "specialRule"

interface OptionSelectorProps {
  selected: Record<SpinOption, boolean>
  onToggle: (option: SpinOption) => void
  disabled?: boolean
}

const OPTIONS: { key: SpinOption; label: string; icon: React.ReactNode; description: string }[] = [
  {
    key: "gunLoadout",
    label: "Gun Loadout",
    icon: <Crosshair className="size-6" />,
    description: "Random weapon assignment",
  },
  {
    key: "map",
    label: "Map",
    icon: <Map className="size-6" />,
    description: "Random active map event",
  },
  {
    key: "specialRule",
    label: "Special Rule",
    icon: <Zap className="size-6" />,
    description: "Random gameplay modifier",
  },
]

export function OptionSelector({ selected, onToggle, disabled }: OptionSelectorProps) {
  const anySelected = Object.values(selected).some(Boolean)

  return (
    <div className="z-10 flex w-full flex-col gap-3">
      <p className="text-center text-xs font-bold tracking-[0.22em] uppercase text-muted-foreground sm:text-sm">
        Configure Drop Parameters
      </p>
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {OPTIONS.map((option) => {
          const isSelected = selected[option.key]
          return (
            <button
              key={option.key}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(option.key)}
              className={cn(
                "group relative flex flex-col items-start gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary/80 bg-card/95 text-foreground"
                  : "border-border bg-card/65 text-muted-foreground hover:border-primary/60 hover:text-foreground",
                disabled && "pointer-events-none opacity-50"
              )}
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg border px-3 py-3.5 transition-colors",
                  isSelected
                    ? "border-primary/70 bg-primary/10 text-primary"
                    : "border-border bg-secondary/70 text-muted-foreground group-hover:text-foreground"
                )}
              >
                <span className="shrink-0">{option.icon}</span>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-wide uppercase">{option.label}</span>
                  <span className="text-xs tracking-wide uppercase text-muted-foreground">{option.description}</span>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
      {!anySelected && (
        <p className="text-center text-xs text-destructive">
          Select at least one category to spin
        </p>
      )}
    </div>
  )
}
