import type { SpecialRule } from "./types"

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
  },
]
