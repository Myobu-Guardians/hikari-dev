import { KitsuneCard } from "./kitsune";

export interface Player {
  id: string;
  kitsuneCardsInDeck: KitsuneCard[];
  kitsuneCardsInHand: KitsuneCard[];
  kitsuneCardsInPlay: KitsuneCard[];
  gamePoints: number;
  turnRemainder: 0 | 1;
  /**
   * - <= 0 means to hide the kitsune cards in hand
   * - \> 0 means to show `?` turns of the kitsune cards in hand
   */
  showKitsuneCardsInHand: number;
  /**
   * - <= 0 means to not hide the kitsune cards in play
   * - \> 0 means to hide `?` turns of the kitsune cards in play
   */
  hideKitsuneCardsInPlay: number;

  /**
   * - <= 0 means to not allow to have extra kitsune card in play
   * - \> 0 means to can place `?` turns of one more kitsune card in play
   */
  extraKitsuneCardsInPlay: number;
}
