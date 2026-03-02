export type WeaponType =
  | "Battle Rifles"
  | "Assault Rifles"
  | "SMG"
  | "Shotgun"
  | "Sniper"
  | "LMG"
  | "Pistol"
  | "Special"

export enum WeaponRarity {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
}

export interface Weapon {
  name: string
  type: WeaponType
  image: string
  rarity: WeaponRarity
}

export interface BaseMap {
  name: string
  id: string
  image: string
}

export interface SpecialRule {
  id: string
  name: string
  description: string
  requiresMapEvent?: string[]
  requiresNoGunLoadout?: boolean
}
