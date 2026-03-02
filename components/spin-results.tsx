"use client"

import type { SpinResult } from "@/lib/spin-result-types"
import { cn } from "@/lib/utils"
import { ResultCard } from "@/components/result-card"
import {
  ANY_GUN_IMAGE,
  ANY_MAP_IMAGE,
  COMMON_GRADIENT,
  DEFAULT_GUN_IMAGE,
  DEFAULT_MAP_IMAGE,
  getRarityGradient,
  getRarityTextColor,
} from "@/lib/spin-result-display"

interface SpinResultsProps {
  result: SpinResult | null
  visible: boolean
}
export function SpinResults({ result, visible }: SpinResultsProps) {
  if (!result || !visible) return null

  const weapon = result.weapon
  const mapEvent = result.mapEvent

  const hasWeapon = Boolean(weapon)
  const hasMap = Boolean(mapEvent)

  const weaponImage = hasWeapon && weapon?.image?.trim() ? weapon.image : ANY_GUN_IMAGE
  const mapImage = hasMap && mapEvent?.image?.trim() ? mapEvent.image : ANY_MAP_IMAGE

  const weaponBackground = hasWeapon && weapon ? getRarityGradient(weapon.rarity) : COMMON_GRADIENT
  const mapBackground = hasMap ? undefined : COMMON_GRADIENT

  const weaponNameColor = hasWeapon && weapon ? getRarityTextColor(weapon.rarity) : "var(--color-primary)"
  const weaponTitle = hasWeapon && weapon ? weapon.name : "Any Gun"
  const weaponSubtitle = hasWeapon && weapon ? weapon.type : "No Loadout Restriction"

  const mapTitle = hasMap && mapEvent ? mapEvent.map : "Any Map"
  const mapSubtitle = hasMap && mapEvent ? mapEvent.name : "No Map Restriction"
  const mapImageClassName = cn("h-full w-full", hasMap ? "object-cover" : "object-contain p-2")

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col gap-4">
      <p className="text-center text-sm font-bold tracking-[0.16em] uppercase text-muted-foreground sm:text-base">
        Mission Objective
      </p>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ResultCard
            label="Gun Loadout"
            title={weaponTitle}
            subtitle={weaponSubtitle}
            imageSrc={weaponImage}
            imageAlt={hasWeapon ? `Weapon result: ${weaponTitle}` : "Weapon result: Any Gun"}
            imageClassName="h-full w-full object-contain p-3"
            imageFallback={DEFAULT_GUN_IMAGE}
            imageBackground={weaponBackground}
            titleColor={weaponNameColor}
          />

          <ResultCard
            label="Map Selection"
            title={mapTitle}
            subtitle={mapSubtitle}
            imageSrc={mapImage}
            imageAlt={hasMap ? `Map result: ${mapTitle}` : "Map result: Any Map"}
            imageClassName={mapImageClassName}
            imageFallback={DEFAULT_MAP_IMAGE}
            imageBackground={mapBackground}
          />
        </div>
      </div>

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
