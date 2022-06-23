import { KitsuneCard } from "./kitsune";
import { OfferingCard } from "./offering";

let areSetsEqual = <T>(a: Set<T>, b: Set<T>) =>
  a.size === b.size && [...a].every((value) => b.has(value));

export function canCastSpell(
  kitsuneCard: KitsuneCard,
  offeringCards: OfferingCard[]
): boolean {
  let canCast = false;
  let spell = kitsuneCard.spell;
  if (!spell) {
    return false;
  }
  const trigger = spell.trigger;
  for (let i = 0; i < trigger.length; i++) {
    const symbols = trigger[i];
    const set1 = new Set(offeringCards.map((c) => c.symbol));
    const set2 = new Set(symbols);
    if (areSetsEqual(set1, set2)) {
      canCast = true;
      break;
    }
  }

  return canCast;
}

/*
Phases:
1. Matches symbols
2. When kitsune card is activated
3. When offering is placed
*/
