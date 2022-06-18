import { KitsuneCard } from "./kitsune";
import { OfferingCard } from "./offering";

export interface Player {
  kitsunCardsInDeck: KitsuneCard[];
  kitsunCardsInHand: KitsuneCard[];
  kitsunCardsInPlay: KitsuneCard[];
  gamePoints: number;
}

export interface GameBoard {
  offeringCardsInDeck: OfferingCard[];
  offeringCardsInPlay: OfferingCard[];
  usedOfferingCards: OfferingCard[];
  player: Player;
  opponent: Player;
}
