import { WeaponRarity, type Weapon } from "./types"

export const WEAPONS: Weapon[] = [
  { name: "Ferro", type: "Battle Rifles", image: "/weapons/Ferro.png", rarity: WeaponRarity.Common },
  { name: "Renegade", type: "Battle Rifles", image: "/weapons/Renegade.png", rarity: WeaponRarity.Rare },
  { name: "Aphelion", type: "Battle Rifles", image: "/weapons/Aphelion.png", rarity: WeaponRarity.Legendary },

  { name: "Kettle", type: "Assault Rifles", image: "/weapons/Kettle.png", rarity: WeaponRarity.Common },
  { name: "Rattler", type: "Assault Rifles", image: "/weapons/Rattler.png", rarity: WeaponRarity.Common },
  { name: "Arpeggio", type: "Assault Rifles", image: "/weapons/Arpeggio.png", rarity: WeaponRarity.Uncommon },
  { name: "Tempest", type: "Assault Rifles", image: "/weapons/Tempest.png", rarity: WeaponRarity.Epic },
  { name: "Bettina", type: "Assault Rifles", image: "/weapons/Bettina.png", rarity: WeaponRarity.Epic },

  { name: "Hairpin", type: "Pistol", image: "/weapons/Hairpin.png", rarity: WeaponRarity.Common },
  { name: "Burletta", type: "Pistol", image: "/weapons/Burletta.png", rarity: WeaponRarity.Uncommon },
  { name: "Anvil", type: "Pistol", image: "/weapons/Anvil.png", rarity: WeaponRarity.Uncommon },
  { name: "Venator", type: "Pistol", image: "/weapons/Venator.png", rarity: WeaponRarity.Rare },

  { name: "Stitcher", type: "SMG", image: "/weapons/Stitcher.png", rarity: WeaponRarity.Common },
  { name: "Bobcat", type: "SMG", image: "/weapons/Bobcat.png", rarity: WeaponRarity.Epic },

  { name: "Il Toro", type: "Shotgun", image: "/weapons/Il_Toro-.png", rarity: WeaponRarity.Uncommon },
  { name: "Vulcano", type: "Shotgun", image: "/weapons/Volcano.png", rarity: WeaponRarity.Epic },

  { name: "Osprey", type: "Sniper", image: "/weapons/Osprey.png", rarity: WeaponRarity.Rare },
  { name: "Jupiter", type: "Sniper", image: "/weapons/Jupiter.png", rarity: WeaponRarity.Legendary },

  { name: "Torrente", type: "LMG", image: "/weapons/Torrente.png", rarity: WeaponRarity.Rare },

  { name: "Equalizer", type: "Special", image: "/weapons/Equalizer.png", rarity: WeaponRarity.Legendary },
  { name: "Hullcracker", type: "Special", image: "/weapons/Hullcracker.png", rarity: WeaponRarity.Epic },
]
