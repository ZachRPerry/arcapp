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
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
        Select categories
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map((option) => {
          const isSelected = selected[option.key]
          return (
            <button
              key={option.key}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(option.key)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-lg border-2 p-5 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground shadow-[0_0_20px_rgba(0,220,180,0.15)]"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
                disabled && "pointer-events-none opacity-50"
              )}
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-md transition-colors",
                  isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover:text-foreground"
                )}
              >
                {option.icon}
              </div>
              <span className="text-sm font-semibold tracking-wide uppercase">
                {option.label}
              </span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
              {isSelected && (
                <div className="absolute top-2 right-2 size-2 rounded-full bg-primary shadow-[0_0_6px_rgba(0,220,180,0.6)]" />
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
