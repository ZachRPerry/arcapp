import type { SpecialRule, Weapon } from "@/lib/game-config"

export interface MapEventResult {
  name: string
  map: string
  image: string
  source: "event" | "base"
  isActiveEvent?: boolean
}

export interface SpinResult {
  weapon?: Weapon
  mapEvent?: MapEventResult
  specialRule?: SpecialRule
}
