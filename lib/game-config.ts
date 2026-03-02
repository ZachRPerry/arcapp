// ============================================
// ARC RAIDERS GAME FORMAT SPINNER - CONFIG
// ============================================
// Edit the lists below to add/remove weapons and special rules.

export interface Weapon {
  name: string
  type: "Battle Rifles" | "Assault Rifles" | "SMG" | "Shotgun" | "Sniper" | "LMG" | "Pistol" | "Special"
  image: string
  rarity: WeaponRarity
}

export enum WeaponRarity {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
}

export interface BaseMap {
  name: string
  id: string
  image: string
}

const DEFAULT_WEAPON_IMAGE = "/result-gun.svg"
const DEFAULT_MAP_IMAGE = "/result-map.svg"

export interface SpecialRule {
  id: string
  name: string
  description: string
  /** If set, this rule is only available when one of these map event names is randomly selected */
  requiresMapEvent?: string[]
  /** If true, this rule is only available when Gun Loadout is NOT checked */
  requiresNoGunLoadout?: boolean
}

// ============================================
// WEAPONS LIST
// ============================================
export const WEAPONS: Weapon[] = [
  // Battle Rifles
  { name: "Ferro", type: "Battle Rifles", image: "/weapons/Ferro.png", rarity: WeaponRarity.Common },
  { name: "Renegade", type: "Battle Rifles", image: "/weapons/Renegade.png", rarity: WeaponRarity.Rare },
  { name: "Aphelion", type: "Battle Rifles", image: "/weapons/Aphelion.png", rarity: WeaponRarity.Legendary },

  // Assault Rifles
  { name: "Kettle", type: "Assault Rifles", image: "/weapons/Kettle.png", rarity: WeaponRarity.Common },
  { name: "Rattler", type: "Assault Rifles", image: "/weapons/Rattler.png", rarity: WeaponRarity.Common }, 
  { name: "Arpeggio", type: "Assault Rifles", image: "/weapons/Arpeggio.png", rarity: WeaponRarity.Uncommon },
  { name: "Tempest", type: "Assault Rifles", image: "/weapons/Tempest.png", rarity: WeaponRarity.Epic },
  { name: "Bettina", type: "Assault Rifles", image: "/weapons/Bettina.png", rarity: WeaponRarity.Epic },

  
  // Pistols
  { name: "Hairpin", type: "Pistol", image: "/weapons/Hairpin.png", rarity: WeaponRarity.Common },
  { name: "Burletta", type: "Pistol", image: "/weapons/Burletta.png", rarity: WeaponRarity.Uncommon },
  { name: "Anvil", type: "Pistol", image: "/weapons/Anvil.png", rarity: WeaponRarity.Uncommon },
  { name: "Venator", type: "Pistol", image: "/weapons/Venator.png", rarity: WeaponRarity.Rare },


  // SMGs
  { name: "Stitcher", type: "SMG", image: "/weapons/Stitcher.png", rarity: WeaponRarity.Common },
  { name: "Bobcat", type: "SMG", image: "/weapons/Bobcat.png", rarity: WeaponRarity.Epic },

  // Shotguns
  { name: "Il Toro", type: "Shotgun", image: "/weapons/Il_Toro-.png", rarity: WeaponRarity.Uncommon },
  { name: "Vulcano", type: "Shotgun", image: "/weapons/Volcano.png", rarity: WeaponRarity.Epic },

  // Snipers
  { name: "Osprey", type: "Sniper", image: "/weapons/Osprey.png", rarity: WeaponRarity.Rare },
  { name: "Jupiter", type: "Sniper", image: "/weapons/Jupiter.png", rarity: WeaponRarity.Legendary },

  // LMGs
  { name: "Torrente", type: "LMG", image: "/weapons/Torrente.png", rarity: WeaponRarity.Rare },

  // Special Weapons
  { name: "Equalizer", type: "Special", image: "/weapons/Equalizer.png", rarity: WeaponRarity.Legendary },
  { name: "Hullcracker", type: "Special", image: "/weapons/Hullcracker.png", rarity: WeaponRarity.Epic },
]

// ============================================
// BASE MAPS
// ============================================
export const BASE_MAPS: BaseMap[] = [
  { name: "Dam", id: "dam", image: "/maps/dam.png" },
  { name: "Spaceport", id: "spaceport", image: "/maps/spaceport.png" },
  { name: "Buried City", id: "buried-city", image: "/maps/buried=city.png" },
  { name: "Blue Gate", id: "blue-gate", image: "/maps/blue-gate.png" },
  { name: "Stella Montis", id: "stella", image: "/maps/stella.png" },
]

// ============================================
// SPECIAL RULES
// ============================================
export const SPECIAL_RULES: SpecialRule[] = [
  {
    id: "pve",
    name: "PVE",
    description: "Focus on PVE content only - avoid PVP engagements.",
  },
  {
    id: "kill-boss",
    name: "Kill a Boss",
    description: "You must kill the boss on this map before extracting.",
    requiresMapEvent: ["Matriarch", "Harvester"],
  },
  {
    id: "melee-kill",
    name: "Get a Melee Kill",
    description: "Score at least one melee kill during the match.",
  },
  {
    id: "gun-game",
    name: "Gun Game",
    description: "Swap your gun after each kill you get.",
  },
  {
    id: "no-heals",
    name: "No Heals",
    description: "Only loot or craft heals in game.",
  },
  {
    id: "no-grenades",
    name: "No Grenades",
    description: "You cannot use any grenades this round.",
  },
  {
    id: "no-shield",
    name: "No Shield Until Looted",
    description: "You cannot use a shield until you loot one in-raid.",
  },
  {
    id: "gun-crate-only",
    name: "Gun Crate Only",
    description: "You can only use weapons found in gun crates.",
    requiresNoGunLoadout: true,
  },
  {
    id: "help-quest",
    name: "Help Someone Complete a Quest",
    description: "Find a random player and help them complete a quest or goal.",
  },
  {
    id: "help-kill-arc",
    name: "Help Someone Kill a Big Arc",
    description: "Team up with random player to take down a big Arc enemy.",
  },
  {
    id: "ride-rocketeer",
    name: "Ride a Rocketeer",
    description: "Ride 'em cowboy. YeeHaw!!",
  },
  {
    id: "ride-hornet",
    name: "Ride a Wasp or Hornet",
    description: "Stepping stones to a rocketeer. They are still too scary.",
  },
  {
    id: "medic",
    name: "Revive a player",
    description: "Provide medical assistance to a random player. Doesn't count if you downed them.",
  },
  {
    id: "duel",
    name: "Duel",
    description: "Challenge a random player to a duel. Start back to back and walk 20 paces",
  },
  {
    id: "bodyguard",
    name: "Bodyguard",
    description: "Be the bodyguard for a random player. Even better if you don't tell them.",
  },
  {
    id: "start-a-band",
    name: "Start a Band",
    description: "Take one of each instrument in and start a band with random players.",
    requiresNoGunLoadout: true,
  }
]
