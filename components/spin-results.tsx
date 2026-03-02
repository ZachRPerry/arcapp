"use client"

import { WeaponRarity, type Weapon, type SpecialRule } from "@/lib/game-config"

interface MapEventResult {
  name: string
  map: string
  image: string
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

function getRarityGradient(rarity: WeaponRarity): string {
  switch (rarity) {
    case WeaponRarity.Uncommon:
      return "linear-gradient(135deg, #14532d 0%, #22c55e 52%, #86efac 100%)"
    case WeaponRarity.Rare:
      return "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 52%, #93c5fd 100%)"
    case WeaponRarity.Epic:
      return "linear-gradient(135deg, #831843 0%, #ec4899 52%, #f9a8d4 100%)"
    case WeaponRarity.Legendary:
      return "linear-gradient(135deg, #78350f 0%, #f59e0b 52%, #fcd34d 100%)"
    case WeaponRarity.Common:
    default:
      return "linear-gradient(135deg, #374151 0%, #6b7280 52%, #d1d5db 100%)"
  }
}

function getRarityTextColor(rarity: WeaponRarity): string {
  switch (rarity) {
    case WeaponRarity.Uncommon:
      return "#22c55e"
    case WeaponRarity.Rare:
      return "#60a5fa"
    case WeaponRarity.Epic:
      return "#f472b6"
    case WeaponRarity.Legendary:
      return "#fbbf24"
    case WeaponRarity.Common:
    default:
      return "#d1d5db"
  }
}

export function SpinResults({ result, visible }: SpinResultsProps) {
  if (!result || !visible) return null

  const weaponImage = result.weapon?.image?.trim() ? result.weapon.image : "/result-gun.svg"
  const mapImage = result.mapEvent?.image?.trim() ? result.mapEvent.image : "/result-map.svg"
  const weaponBackground = result.weapon ? getRarityGradient(result.weapon.rarity) : undefined
  const weaponNameColor = result.weapon ? getRarityTextColor(result.weapon.rarity) : undefined

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col gap-4">
      <p className="text-center text-sm font-bold tracking-[0.16em] uppercase text-muted-foreground sm:text-base">
        Mission Objective
      </p>

      {(result.weapon || result.mapEvent) && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {result.weapon && (
            <article className="overflow-hidden rounded-xl border border-primary/55 bg-card/90 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)]">
              <div className="relative h-40 w-full border-b border-border/80 sm:h-48" style={{ backgroundImage: weaponBackground }}>
                <img
                  src={weaponImage}
                  alt={`Weapon result: ${result.weapon.name}`}
                  className="h-full w-full object-contain p-3"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = "/result-gun.svg"
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 p-4 sm:p-5">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">Gun Loadout</p>
                <p className="text-2xl font-black tracking-wide uppercase sm:text-3xl" style={{ color: weaponNameColor }}>{result.weapon.name}</p>
                <p className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{result.weapon.type}</p>
              </div>
            </article>
          )}

          {result.mapEvent && (
            <article className="overflow-hidden rounded-xl border border-primary/55 bg-card/90 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)]">
              <div className="relative h-40 w-full border-b border-border/80 bg-secondary/40 sm:h-48">
                <img
                  src={mapImage}
                  alt={`Map result: ${result.mapEvent.map}`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = "/result-map.svg"
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 p-4 sm:p-5">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">Map Selection</p>
                <p className="text-2xl font-black tracking-wide uppercase text-primary sm:text-3xl">{result.mapEvent.map}</p>
                <p className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{result.mapEvent.name}</p>
              </div>
            </article>
          )}
        </div>
      )}

      {result.specialRule && (
        <div className="mx-auto w-full max-w-3xl">
          <article className="flex flex-col rounded-xl border border-primary/55 bg-card/90 p-4 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)] sm:p-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">Special Rule</p>
              <p className="text-2xl font-black tracking-wide uppercase text-primary sm:text-3xl">{result.specialRule.name}</p>
              <p className="text-sm text-foreground/80">{result.specialRule.description}</p>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
