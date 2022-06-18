import { NumOfOfferingCardsInPlay } from "./constants";
import { KitsuneCard } from "./kitsune";
import { OfferingCard, OfferingCards } from "./offering";

export interface Player {
  kitsunCardsInDeck: KitsuneCard[];
  kitsunCardsInHand: KitsuneCard[];
  kitsunCardsInPlay: KitsuneCard[];
  gamePoints: number;
}

export class GameBoard {
  offeringCardsInDeck: OfferingCard[] = [];
  offeringCardsInPlay: OfferingCard[] = [];
  usedOfferingCards: OfferingCard[] = [];
  player?: Player = undefined;
  opponent?: Player = undefined;

  constructor() {
    this.offeringCardsInDeck = [...OfferingCards];
    this.offeringCardsInPlay = [];
    this.usedOfferingCards = [];

    this.drawOfferingCards();
  }

  public drawOfferingCards() {
    if (this.offeringCardsInPlay.length < NumOfOfferingCardsInPlay) {
      const numToDraw =
        NumOfOfferingCardsInPlay - this.offeringCardsInPlay.length;

      for (let i = 0; i < numToDraw; i++) {
        const drawIndex = Math.floor(
          Math.random() * this.offeringCardsInDeck.length
        );
        const drawnCard = this.offeringCardsInDeck.splice(drawIndex, 1)[0];
        this.offeringCardsInPlay.push(drawnCard);
      }
    }
  }
}
