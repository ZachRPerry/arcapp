"use client"

import { useCallback, useState } from "react"
import useSWR from "swr"
import { Dices, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptionSelector, type SpinOption } from "@/components/option-selector"
import { SpinAnimation } from "@/components/spin-animation"
import { SpinResults, type SpinResult } from "@/components/spin-results"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { WEAPONS, SPECIAL_RULES, BASE_MAPS } from "@/lib/game-config"
import type { MapEvent } from "@/app/api/events/route"

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function GameSpinner() {
  const [selected, setSelected] = useState<Record<SpinOption, boolean>>({
    gunLoadout: true,
    map: true,
    specialRule: true,
  })
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<SpinResult | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Pre-fetch map events so they're cached
  const { data: mapEvents } = useSWR<MapEvent[]>("/api/events", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const anySelected = Object.values(selected).some(Boolean)

  function handleToggle(option: SpinOption) {
    setSelected((prev) => ({ ...prev, [option]: !prev[option] }))
  }

  function performSpin() {
    const spinResult: SpinResult = {}

    // Gun Loadout
    if (selected.gunLoadout) {
      spinResult.weapon = pickRandom(WEAPONS)
    }

    // Map
    if (selected.map) {
      const mapPool: Array<{name: string; map: string; image: string}> = []
      const mapImageByName = new Map(BASE_MAPS.map((baseMap) => [baseMap.name, baseMap.image]))
      
      // Add events if available
      if (mapEvents && mapEvents.length > 0) {
        const now = Date.now()
        const activeEvents = mapEvents.filter(
          (e) => e.startTime <= now && e.endTime >= now
        )
        const eventsToUse = activeEvents.length > 0 ? activeEvents : mapEvents
        mapPool.push(
          ...eventsToUse.map((event) => ({
            name: event.name,
            map: event.map,
            image: mapImageByName.get(event.map) ?? "/result-map.svg",
          }))
        )
      }
      
      // Always add base maps to the pool for chance selection
      mapPool.push(...BASE_MAPS.map((baseMap) => ({ name: baseMap.name, map: baseMap.name, image: baseMap.image })))
      
      // Pick randomly from combined pool
      if (mapPool.length > 0) {
        const selected = pickRandom(mapPool)
        spinResult.mapEvent = selected
      }
    }

    // Special Rule
    if (selected.specialRule) {
      let eligibleRules = SPECIAL_RULES.filter((rule) => {
        // Filter rules that require no gun loadout
        if (rule.requiresNoGunLoadout && selected.gunLoadout) return false
        // Filter rules that require specific map events
        if (rule.requiresMapEvent && spinResult.mapEvent) {
          return rule.requiresMapEvent.includes(spinResult.mapEvent.name)
            ? true
            : false
        }
        if (rule.requiresMapEvent && !spinResult.mapEvent) return false
        return true
      })

      // Fallback: if all rules are filtered, use the generic ones
      if (eligibleRules.length === 0) {
        eligibleRules = SPECIAL_RULES.filter(
          (r) => !r.requiresMapEvent && !r.requiresNoGunLoadout
        )
      }

      if (eligibleRules.length > 0) {
        spinResult.specialRule = pickRandom(eligibleRules)
      }
    }

    return spinResult
  }

  function handleSpin() {
    if (!anySelected) return
    setShowResults(false)
    setResult(null)
    setIsSpinning(true)
    
    // Track spin event in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'spin_initiated', {
        'selected_categories': Object.keys(selected).filter(key => selected[key as SpinOption])
      })
    }
  }

  const handleSpinComplete = useCallback(() => {
    const spinResult = performSpin()
    setResult(spinResult)
    setIsSpinning(false)
    setShowResults(true)
    
    // Track spin completion in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'spin_completed', {
        'had_weapon': !!spinResult.weapon,
        'had_map': !!spinResult.mapEvent,
        'had_rule': !!spinResult.specialRule
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, mapEvents])

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      {/* Option Selector */}
      <OptionSelector
        selected={selected}
        onToggle={handleToggle}
        disabled={isSpinning}
      />

      {/* Spin Button */}
      <div className="flex flex-col items-center gap-3">
        {!showResults && (
          <Button
            onClick={handleSpin}
            disabled={!anySelected || isSpinning}
            size="lg"
            className="relative h-14 w-full max-w-sm gap-3 rounded-lg border-2 border-primary/90 bg-primary text-primary-foreground text-2xl font-black tracking-wide uppercase transition-all duration-300 hover:bg-primary/90"
          >
            <Dices className="size-5" />
            {isSpinning ? "Spinning..." : "Spin"}
          </Button>
        )}
      </div>

      {/* Spin Animation */}
      <SpinAnimation
        isSpinning={isSpinning}
        onComplete={handleSpinComplete}
      />

      {/* Results */}
      <SpinResults result={result} visible={showResults} />

      {/* Spin Again Button */}
      {showResults && (
        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={handleSpin}
            size="lg"
            className="relative h-14 w-full max-w-sm gap-3 rounded-lg border-2 border-primary/90 bg-primary text-primary-foreground text-2xl font-black tracking-wide uppercase transition-all duration-300 hover:bg-primary/90"
          >
            <RotateCcw className="size-5" />
            Spin Again
          </Button>
        </div>
      )}

      {/* Feedback */}
      <div className="flex justify-center border-t border-border/80 pt-4">
        <FeedbackDialog />
      </div>
    </div>
  )
}
