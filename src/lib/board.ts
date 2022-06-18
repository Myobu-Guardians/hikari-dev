import { NumOfOfferingCardsInPlay } from "./constants";
import { exampleKitsuneCard, KitsuneCard } from "./kitsune";
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

    // TODO: Delete below
    this.createFakeKitsuneCards();
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

  private createFakeKitsuneCards() {
    const fakeKitsuneCards: KitsuneCard[] = [
      exampleKitsuneCard,
      exampleKitsuneCard,
      exampleKitsuneCard,
    ];
    this.player = {
      kitsunCardsInDeck: fakeKitsuneCards,
      kitsunCardsInHand: fakeKitsuneCards,
      kitsunCardsInPlay: fakeKitsuneCards,
      gamePoints: 4,
    };
    this.opponent = {
      kitsunCardsInDeck: fakeKitsuneCards,
      kitsunCardsInHand: fakeKitsuneCards,
      kitsunCardsInPlay: fakeKitsuneCards,
      gamePoints: 6,
    };
  }
}
