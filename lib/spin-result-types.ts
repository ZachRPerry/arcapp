import type { SpecialRule, Weapon } from "@/lib/game-config"

export interface MapEventResult {
  name: string
  map: string
  image: string
}

export interface SpinResult {
  weapon?: Weapon
  mapEvent?: MapEventResult
  specialRule?: SpecialRule
}
