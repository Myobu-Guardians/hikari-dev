import {
  Tail6DarkShowEnemyKitsuneCardsTurns,
  Tail6LightHidePlayerKitsuneCardsTurns,
  Tail9DarkLockEnemyKitsuneCardsturns,
  Tail9LightSpellExtraKitsuneCardsInPlayTurns,
  Tail7DarkLockedOfferingCardsNum,
  Tail7DarkLockedOfferingCardsTurns,
  Tail7LightSpellExtraOfferingCardsToDraw,
} from "./constants";
import { OfferingSymbol } from "./offering";

export type SpellId =
  | "tail-1-light-spell"
  | "tail-2-light-spell"
  | "tail-3-light-spell"
  | "tail-4-light-spell"
  | "tail-5-light-spell"
  | "tail-6-light-spell"
  | "tail-9-light-spell"
  | "tail-8-light-spell"
  | "tail-7-light-spell"
  | "tail-1-dark-spell"
  | "tail-2-dark-spell"
  | "tail-3-dark-spell"
  | "tail-4-dark-spell"
  | "tail-5-dark-spell"
  | "tail-6-dark-spell"
  | "tail-9-dark-spell"
  | "tail-8-dark-spell"
  | "tail-7-dark-spell";

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
  description: "spells/tail-1-light",
  trigger: [[OfferingSymbol.MusicInstrument], [OfferingSymbol.Incense]],
});
spells.set("tail-2-light-spell", {
  id: "tail-2-light-spell",
  description: "spells/tail-2-light",
  trigger: [[OfferingSymbol.Incense], [OfferingSymbol.Plant]],
});
spells.set("tail-3-light-spell", {
  id: "tail-3-light-spell",
  description: "spells/tail-3-light",
  trigger: [],
});
spells.set("tail-4-light-spell", {
  id: "tail-4-light-spell",
  description: "spells/tail-4-light",
  trigger: [[OfferingSymbol.Incense, OfferingSymbol.MusicInstrument]],
});
spells.set("tail-5-light-spell", {
  id: "tail-5-light-spell",
  description: "spells/tail-5-light",
  trigger: [],
});
spells.set("tail-6-light-spell", {
  id: "tail-6-light-spell",
  description: "spells/tail-6-light",
  trigger: [[OfferingSymbol.MusicInstrument], [OfferingSymbol.Plant]],
});
spells.set("tail-7-light-spell", {
  id: "tail-7-light-spell",
  description: "spells/tail-7-light",
  trigger: [[OfferingSymbol.Incense]],
});
spells.set("tail-8-light-spell", {
  id: "tail-8-light-spell",
  description: "spells/tail-8-light",
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
  description: "spells/tail-9-light",
  trigger: [[OfferingSymbol.MusicInstrument, OfferingSymbol.Incense]],
});
// Dark
spells.set("tail-1-dark-spell", {
  id: "tail-1-dark-spell",
  description: "spells/tail-1-dark",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
});
spells.set("tail-2-dark-spell", {
  id: "tail-2-dark-spell",
  description: "spells/tail-2-dark",
  trigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Beverage]],
});
spells.set("tail-3-dark-spell", {
  id: "tail-3-dark-spell",
  description: "spells/tail-3-dark",
  trigger: [],
});
spells.set("tail-4-dark-spell", {
  id: "tail-4-dark-spell",
  description: "spells/tail-4-dark",
  trigger: [[OfferingSymbol.Treasure, OfferingSymbol.Food]],
});
spells.set("tail-5-dark-spell", {
  id: "tail-5-dark-spell",
  description: "spells/tail-5-dark",
  trigger: [],
});
spells.set("tail-6-dark-spell", {
  id: "tail-6-dark-spell",
  description: "spells/tail-6-dark",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
});
spells.set("tail-7-dark-spell", {
  id: "tail-7-dark-spell",
  description: "spells/tail-7-dark",
  trigger: [[OfferingSymbol.Treasure]],
});
spells.set("tail-8-dark-spell", {
  id: "tail-8-dark-spell",
  description: "spells/tail-8-dark",
  trigger: [
    [OfferingSymbol.Food, OfferingSymbol.Beverage, OfferingSymbol.Treasure],
  ],
});
spells.set("tail-9-dark-spell", {
  id: "tail-9-dark-spell",
  description: "spells/tail-9-dark",
  trigger: [[OfferingSymbol.Food, OfferingSymbol.Treasure]],
});

export function getSpellById(spellId: SpellId): Spell | undefined {
  return spells.get(spellId);
}
