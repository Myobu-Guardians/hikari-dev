import {
  Tail6DarkShowEnemyKitsuneCardsTurns,
  Tail6LightHidePlayerKitsuneCardsTurns,
  Tail7DarkLockEnemyKitsuneCardsturns,
  Tail7LightSpellExtraKitsuneCardsInPlayTurns,
  Tail9DarkLockedOfferingCardsNum,
  Tail9DarkLockedOfferingCardsTurns,
  Tail9LightSpellExtraOfferingCardsToDraw,
} from "./constants";
import { OfferingSymbol } from "./offering";

export type SpellId =
  | "tail-1-light-spell"
  | "tail-2-light-spell"
  | "tail-3-light-spell"
  | "tail-4-light-spell"
  | "tail-5-light-spell"
  | "tail-6-light-spell"
  | "tail-7-light-spell"
  | "tail-8-light-spell"
  | "tail-9-light-spell"
  | "tail-1-dark-spell"
  | "tail-2-dark-spell"
  | "tail-3-dark-spell"
  | "tail-4-dark-spell"
  | "tail-5-dark-spell"
  | "tail-6-dark-spell"
  | "tail-7-dark-spell"
  | "tail-8-dark-spell"
  | "tail-9-dark-spell";

export interface Spell {
  id: SpellId;
  description: string;
  /**
   * [[A], [B]] means A || B
   * [[A, B], [C]] means (A && B) || C
   */
  trigger: OfferingSymbol[][];
}

const spells: Map<SpellId, Spell> = new Map();
// Light
spells.set("tail-1-light-spell", {
  id: "tail-1-light-spell",
  description: "Gain 1 point",
  trigger: [[OfferingSymbol.MusicInstrument], [OfferingSymbol.Incense]],
});
spells.set("tail-2-light-spell", {
  id: "tail-2-light-spell",
  description: "Increase any card number by 3",
  trigger: [[OfferingSymbol.Incense], [OfferingSymbol.Plant]],
});
spells.set("tail-3-light-spell", {
  id: "tail-3-light-spell",
  description:
    "When you activate any card, you have 33% chance to cast any spell",
  trigger: [],
});
spells.set("tail-4-light-spell", {
  id: "tail-4-light-spell",
  description: "Add any symbol to target card",
  trigger: [[OfferingSymbol.Incense, OfferingSymbol.MusicInstrument]],
});
spells.set("tail-5-light-spell", {
  id: "tail-5-light-spell",
  description:
    "When n Flora Offerings are placed, you have n/4 chance to cast any spell",
  trigger: [],
});
spells.set("tail-6-light-spell", {
  id: "tail-6-light-spell",
  description: `Hide all of your cards for ${Tail6LightHidePlayerKitsuneCardsTurns} turns`,
  trigger: [[OfferingSymbol.MusicInstrument], [OfferingSymbol.Plant]],
});
spells.set("tail-7-light-spell", {
  id: "tail-7-light-spell",
  description: `Can place 1 more kitsune card for ${Tail7LightSpellExtraKitsuneCardsInPlayTurns} turns`,
  trigger: [[OfferingSymbol.MusicInstrument, OfferingSymbol.Incense]],
});
spells.set("tail-8-light-spell", {
  id: "tail-8-light-spell",
  description: "Gain 3 points",
  trigger: [
    [
      OfferingSymbol.MusicInstrument,
      OfferingSymbol.Plant,
      OfferingSymbol.Incense,
    ],
  ],
});
spells.set("tail-9-light-spell", {
  id: "tail-9-light-spell",
  description: `Draw ${Tail9LightSpellExtraOfferingCardsToDraw} offerings, act again, then put them back to deck in any order`,
  trigger: [[OfferingSymbol.Incense]],
});
// Dark
spells.set("tail-1-dark-spell", {
  id: "tail-1-dark-spell",
  description: "Enemy loses 1 point",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
});
spells.set("tail-2-dark-spell", {
  id: "tail-2-dark-spell",
  description: "Decrease any card number by 3",
  trigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Beverage]],
});
spells.set("tail-3-dark-spell", {
  id: "tail-3-dark-spell",
  description:
    "When enemy activates their card, you have 33% chance to cast any spell",
  trigger: [],
});
spells.set("tail-4-dark-spell", {
  id: "tail-4-dark-spell",
  description: "Remove any symbol from target card",
  trigger: [[OfferingSymbol.Treasure, OfferingSymbol.Food]],
});
spells.set("tail-5-dark-spell", {
  id: "tail-5-dark-spell",
  description:
    "When n Bounty Offerings are placed, you have n/4 chance to cast any spell",
  trigger: [],
});
spells.set("tail-6-dark-spell", {
  id: "tail-6-dark-spell",
  description: `Show all of enemy's cards for ${Tail6DarkShowEnemyKitsuneCardsTurns} turns`,
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
});
spells.set("tail-7-dark-spell", {
  id: "tail-7-dark-spell",
  description: `Return target card to its owners hand and lock for ${Tail7DarkLockEnemyKitsuneCardsturns} turns`,
  trigger: [[OfferingSymbol.Food, OfferingSymbol.Treasure]],
});
spells.set("tail-8-dark-spell", {
  id: "tail-8-dark-spell",
  description: "Enemy loses 3 points",
  trigger: [
    [OfferingSymbol.Food, OfferingSymbol.Beverage, OfferingSymbol.Treasure],
  ],
});
spells.set("tail-9-dark-spell", {
  id: "tail-9-dark-spell",
  description: `Prevent enemy from using ${Tail9DarkLockedOfferingCardsNum} offering for ${Tail9DarkLockedOfferingCardsTurns} turns`,
  trigger: [[OfferingSymbol.Treasure]],
});

export function getSpellById(spellId: SpellId): Spell | undefined {
  return spells.get(spellId);
}
