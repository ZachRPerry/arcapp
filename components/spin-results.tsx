"use client"

import { Crosshair, Map, Zap } from "lucide-react"
import type { Weapon, SpecialRule } from "@/lib/game-config"
import { cn } from "@/lib/utils"

interface MapEventResult {
  name: string
  map: string
  icon: string
}

export interface SpinResult {
  weapon?: Weapon
  mapEvent?: MapEventResult
  specialRule?: SpecialRule
}

interface SpinResultsProps {
  result: SpinResult | null
  visible: boolean
}

function ResultCard({
  icon,
  label,
  value,
  detail,
  delay,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail?: string
  delay: number
}) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-card p-6 shadow-[0_0_24px_rgba(0,220,180,0.08)]"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both", animationDuration: "500ms" }}
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary">
        {icon}
      </div>
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
        {label}
      </p>
      <p className="text-xl font-bold tracking-wide text-foreground text-center text-balance">
        {value}
      </p>
      {detail && (
        <p className="text-xs text-muted-foreground text-center">{detail}</p>
      )}
    </div>
  )
}

export function SpinResults({ result, visible }: SpinResultsProps) {
  if (!result || !visible) return null

  const cards: { icon: React.ReactNode; label: string; value: string; detail?: string }[] = []

  if (result.weapon) {
    cards.push({
      icon: <Crosshair className="size-5" />,
      label: "Weapon",
      value: result.weapon.name,
      detail: result.weapon.type,
    })
  }

  if (result.mapEvent) {
    cards.push({
      icon: <Map className="size-5" />,
      label: "Map",
      value: result.mapEvent.map,
      detail: result.mapEvent.name,
    })
  }

  if (result.specialRule) {
    cards.push({
      icon: <Zap className="size-5" />,
      label: "Special Rule",
      value: result.specialRule.name,
      detail: result.specialRule.description,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-sm font-medium tracking-widest uppercase text-primary">
        Your Mission
      </p>
      <div
        className={cn(
          "grid gap-4",
          cards.length === 1 && "grid-cols-1 max-w-sm mx-auto",
          cards.length === 2 && "grid-cols-1 sm:grid-cols-2",
          cards.length === 3 && "grid-cols-1 sm:grid-cols-3"
        )}
      >
        {cards.map((card, i) => (
          <ResultCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            detail={card.detail}
            delay={i * 200}
          />
        ))}
      </div>
    </div>
  )
}
