import { KitsuneCard } from "./kitsune";

export interface Player {
  id: string;
  kitsuneCardsInDeck: KitsuneCard[];
  kitsuneCardsInHand: KitsuneCard[];
  kitsuneCardsInPlay: KitsuneCard[];
  gamePoints: number;
  turnRemainder: 0 | 1;
}
