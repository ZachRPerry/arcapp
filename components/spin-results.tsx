"use client"

import { useEffect, useMemo, useState } from "react"
import { Lock, Unlock } from "lucide-react"
import { WEAPONS, BASE_MAPS, SPECIAL_RULES } from "@/lib/game-config"
import type { SpinResult } from "@/lib/spin-result-types"
import { cn } from "@/lib/utils"
import { ResultCard } from "@/components/result-card"
import type { SpinOption } from "@/components/option-selector"
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
  isSpinning: boolean
  selected: Record<SpinOption, boolean>
  locked: Record<SpinOption, boolean>
  onToggleLock: (option: SpinOption) => void
}
const SPIN_MESSAGES = ["SCANNING", "ROLLING", "DECRYPTING", "LOCKING", "DEPLOYING"]

export function SpinResults({
  result,
  visible,
  isSpinning,
  selected,
  locked,
  onToggleLock,
}: SpinResultsProps) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!isSpinning) {
      setTick(0)
      return
    }

    const interval = setInterval(() => {
      setTick((value) => value + 1)
    }, 90)

    return () => clearInterval(interval)
  }, [isSpinning])

  const weaponReel = useMemo(
    () =>
      WEAPONS.map((weapon) => ({
        name: weapon.name,
        type: weapon.type,
        rarity: weapon.rarity,
        image: weapon.image?.trim() ? weapon.image : DEFAULT_GUN_IMAGE,
      })),
    []
  )
  const mapReel = useMemo(
    () =>
      BASE_MAPS.map((baseMap) => ({
        name: baseMap.name,
        image: baseMap.image?.trim() ? baseMap.image : DEFAULT_MAP_IMAGE,
      })),
    []
  )
  const ruleReel = useMemo(() => SPECIAL_RULES.map((rule) => rule.name), [])

  if (!visible && !isSpinning) return null

  const weapon = result?.weapon
  const mapEvent = result?.mapEvent

  const hasWeapon = Boolean(weapon) && selected.gunLoadout
  const hasMap = Boolean(mapEvent) && selected.map
  const showRuleCard = true

  const weaponSpinning = isSpinning && selected.gunLoadout && !locked.gunLoadout
  const mapSpinning = isSpinning && selected.map && !locked.map
  const ruleSpinning = isSpinning && selected.specialRule && !locked.specialRule
  const specialRuleTitle = !selected.specialRule
    ? "No Rules Selected"
    : ruleSpinning
      ? ruleReel[(tick + 2) % ruleReel.length]
      : result?.specialRule?.name ?? "Any Rule"
  const specialRuleDescription = !selected.specialRule
    ? "Enable Special Rule to include one in your spin."
    : ruleSpinning
      ? `${SPIN_MESSAGES[(tick + 3) % SPIN_MESSAGES.length]} RULE`
      : result?.specialRule?.description ?? "No Special Rule Restriction"


  const weaponSpinFrame = weaponReel[tick % weaponReel.length]
  const mapSpinFrame = mapReel[tick % mapReel.length]

  const weaponImage = weaponSpinning
    ? weaponSpinFrame.image
    : hasWeapon && weapon?.image?.trim()
      ? weapon.image
      : ANY_GUN_IMAGE
  const mapImage = mapSpinning
    ? mapSpinFrame.image
    : hasMap && mapEvent?.image?.trim()
      ? mapEvent.image
      : ANY_MAP_IMAGE

  const weaponBackground = hasWeapon && weapon ? getRarityGradient(weapon.rarity) : COMMON_GRADIENT
  const mapBackground = hasMap ? undefined : COMMON_GRADIENT

  const weaponNameColor = weaponSpinning
    ? getRarityTextColor(weaponSpinFrame.rarity)
    : hasWeapon && weapon
      ? getRarityTextColor(weapon.rarity)
      : "var(--color-primary)"
  const weaponTitle = weaponSpinning
    ? weaponSpinFrame.name
    : hasWeapon && weapon
      ? weapon.name
      : "Any Gun"
  const weaponTag = weaponSpinning
    ? weaponSpinFrame.type
    : hasWeapon && weapon
      ? weapon.type
      : undefined

  const mapEventName = hasMap && mapEvent && mapEvent.source === "event" ? mapEvent.name : ""
  const mapTitleWithEvent = mapEventName && mapEventName !== mapEvent?.map ? `${mapEvent?.map} - ${mapEventName}` : mapEvent?.map

  const mapTitle = mapSpinning
    ? mapSpinFrame.name
    : hasMap && mapEvent
      ? mapTitleWithEvent ?? mapEvent.map
      : "Any Map"
  const mapImageClassName = cn("h-full w-full", hasMap || mapSpinning ? "object-cover" : "object-contain p-2")
  const mapBadgeText = mapSpinning
    ? "Spinning"
    : hasMap && mapEvent
    ? mapEvent.source === "base"
      ? "Base Map"
      : mapEvent.isActiveEvent
        ? "Active Event"
        : "Map Event"
    : undefined
  const mapBadgeClassName = mapSpinning
    ? "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-primary"
    : hasMap && mapEvent
    ? mapEvent.source === "base"
      ? "inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-secondary-foreground"
      : mapEvent.isActiveEvent
        ? "inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-primary"
        : "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-primary/80"
    : undefined

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
            subtitle={weaponTag}
            isSpinning={weaponSpinning}
            lockable={selected.gunLoadout}
            isLocked={locked.gunLoadout}
            onToggleLock={() => onToggleLock("gunLoadout")}
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
            isSpinning={mapSpinning}
            lockable={selected.map}
            isLocked={locked.map}
            onToggleLock={() => onToggleLock("map")}
            badgeText={mapBadgeText}
            badgeClassName={mapBadgeClassName}
            imageSrc={mapImage}
            imageAlt={hasMap ? `Map result: ${mapTitle}` : "Map result: Any Map"}
            imageClassName={mapImageClassName}
            imageFallback={DEFAULT_MAP_IMAGE}
            imageBackground={mapBackground}
          />
        </div>
      </div>

      {showRuleCard && (
        <div className="mx-auto w-full max-w-3xl">
          <article className="relative flex min-h-[9.75rem] flex-col rounded-xl border border-primary/55 bg-card/90 p-4 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_22%,transparent)] sm:min-h-[10.5rem] sm:p-5">
            {selected.specialRule && (
              <button
                type="button"
                aria-pressed={locked.specialRule}
                aria-label={locked.specialRule ? "Unlock result" : "Lock result"}
                onClick={() => onToggleLock("specialRule")}
                className={cn(
                  "absolute top-3 right-3 z-20 inline-flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors",
                  locked.specialRule
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]"
                    : "border-border/80 border-dashed bg-card/45 text-foreground/85 hover:border-primary/60 hover:text-foreground"
                )}
              >
                {locked.specialRule ? <Lock className="size-4" /> : <Unlock className="size-4" />}
              </button>
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">Special Rule</p>
                <p className="min-h-[2.75rem] overflow-hidden text-2xl leading-tight font-black tracking-wide uppercase text-primary line-clamp-2 sm:min-h-[3.25rem] sm:text-3xl">
                  {specialRuleTitle}
                </p>
                <p className="min-h-[1.75rem] overflow-hidden text-sm text-foreground/80 line-clamp-2">
                  {specialRuleDescription}
                </p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
