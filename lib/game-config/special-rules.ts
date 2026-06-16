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
  {
    id: "jump-tower",
    name: "Jump Off the Tower and Survive",
    description: "Leap from the top of the tower and live to tell the tale.",
    requiresMap: ["Spaceport"],
  },
  {
    id: "comet-igniter-kill",
    name: "Comet Igniter Kill",
    description: "Kill an enemy using a Comet Igniter.",
  },
  {
    id: "extract-rat",
    name: "Be a Rat",
    description: "Camp the extract and kill someone right as they try to leave.",
  },
  {
    id: "grenades-only",
    name: "Grenades Only",
    description: "Go in with only grenades, wipe a full team, and extract.",
    requiresNoGunLoadout: true,
  },
  {
    id: "melee-bastion",
    name: "Melee a Bastion",
    description: "Take down a Bastion using melee attacks only.",
  },
  {
    id: "recruit-the-fallen",
    name: "Recruit the Fallen",
    description: "Revive everyone you kill, have them join your team, and keep building your squad.",
  },
  {
    id: "shredder-deadline",
    name: "Deadline a Shredder",
    description: "Stick a Deadline on a Shredder.",
  },
  {
    id: "free-kit-glow-up",
    name: "Free Kit Glow Up",
    description: "Go in with a free kit and don't leave until you have all purple or better gear.",
    requiresNoGunLoadout: true,
  },
]
