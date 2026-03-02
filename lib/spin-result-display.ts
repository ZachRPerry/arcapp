import { WeaponRarity } from "@/lib/game-config"

export const COMMON_GRADIENT = "linear-gradient(135deg, #374151 0%, #6b7280 52%, #d1d5db 100%)"
export const DEFAULT_GUN_IMAGE = "/result-gun.svg"
export const DEFAULT_MAP_IMAGE = "/result-map.svg"
export const ANY_GUN_IMAGE = "/weapons/anygun.png"
export const ANY_MAP_IMAGE = "/maps/anymap.png"

export function getRarityGradient(rarity: WeaponRarity): string {
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
      return COMMON_GRADIENT
  }
}

export function getRarityTextColor(rarity: WeaponRarity): string {
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
