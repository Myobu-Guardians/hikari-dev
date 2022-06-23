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
spells.set("tail-1-light-spell", {
  id: "tail-1-light-spell",
  description: "Gain one point",
  trigger: [[OfferingSymbol.MusicInstrument], [OfferingSymbol.Incense]],
});
spells.set("tail-2-light-spell", {
  id: "tail-2-light-spell",
  description: "Increase any card number by three",
  trigger: [[OfferingSymbol.Plant], [OfferingSymbol.Incense]],
});
spells.set("tail-3-light-spell", {
  id: "tail-3-light-spell",
  description: "When you activate any card, you can cast any spell",
  trigger: [],
});
spells.set("tail-4-light-spell", {
  id: "tail-4-light-spell",
  description: "Add any symbol to target card",
  trigger: [[OfferingSymbol.MusicInstrument, OfferingSymbol.Incense]],
});
spells.set("tail-5-light-spell", {
  id: "tail-5-light-spell",
  description: "When any Flora Offering is placed, you can activate any card",
  trigger: [],
});
spells.set("tail-6-light-spell", {
  id: "tail-6-light-spell",
  description: "Replace this card with any card in your hand",
  trigger: [],
});
spells.set("tail-7-light-spell", {
  id: "tail-7-light-spell",
  description: "Gain three points",
  trigger: [
    [
      OfferingSymbol.MusicInstrument,
      OfferingSymbol.Plant,
      OfferingSymbol.Incense,
    ],
  ],
});
spells.set("tail-8-light-spell", {
  id: "tail-8-light-spell",
  description:
    "When you cast a spell, you can remove any number or effects from any card",
  trigger: [],
});
spells.set("tail-9-light-spell", {
  id: "tail-9-light-spell",
  description: "Draw three offerings, then put them back in any order",
  trigger: [[OfferingSymbol.Incense]],
});
spells.set("tail-1-dark-spell", {
  id: "tail-1-dark-spell",
  description: "Enemy loses one point",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
});
spells.set("tail-2-dark-spell", {
  id: "tail-2-dark-spell",
  description: "Decrease any card number by three",
  trigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Beverage]],
});
spells.set("tail-3-dark-spell", {
  id: "tail-3-dark-spell",
  description: "When enemy activates their card, you can cast any spell",
  trigger: [],
});
spells.set("tail-4-dark-spell", {
  id: "tail-4-dark-spell",
  description: "Remove any symbol from target card",
  trigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Food]],
});
spells.set("tail-5-dark-spell", {
  id: "tail-5-dark-spell",
  description: "When any Bounty Offering is placed, you can cast any spell",
  trigger: [],
});
spells.set("tail-6-dark-spell", {
  id: "tail-6-dark-spell",
  description: "Look at the enemies hand",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
});
spells.set("tail-7-dark-spell", {
  id: "tail-7-dark-spell",
  description: "Return target card to its owners hand",
  trigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
});
spells.set("tail-8-dark-spell", {
  id: "tail-8-dark-spell",
  description: "Enemy loses three points",
  trigger: [
    [OfferingSymbol.Food, OfferingSymbol.Beverage, OfferingSymbol.Treasure],
  ],
});
spells.set("tail-9-dark-spell", {
  id: "tail-9-dark-spell",
  description: "Discard all Offerings",
  trigger: [[OfferingSymbol.Treasure]],
});

export function getSpellById(spellId: SpellId): Spell | undefined {
  return spells.get(spellId);
}
