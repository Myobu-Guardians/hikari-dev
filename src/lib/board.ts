import { NumOfKitsuneCardsInPlay, NumOfOfferingCardsInPlay } from "./constants";
import { createKitsuneCards, exampleKitsuneCard, KitsuneCard } from "./kitsune";
import { OfferingCard, createOfferingCards } from "./offering";
import { generateUUID, shuffleArray } from "./utils";

export interface Player {
  id: string;
  kitsunCardsInDeck: KitsuneCard[];
  kitsunCardsInHand: KitsuneCard[];
  kitsunCardsInPlay: KitsuneCard[];
  gamePoints: number;
  turnRemainder: 0 | 1;
}

export class GameBoard {
  kitsuneCardsInDeck: KitsuneCard[] = [];
  offeringCardsInDeck: OfferingCard[] = [];
  offeringCardsInPlay: OfferingCard[] = [];
  usedOfferingCards: OfferingCard[] = [];
  player?: Player = undefined;
  opponent?: Player = undefined;

  constructor() {
    this.kitsuneCardsInDeck = createKitsuneCards();
    this.offeringCardsInDeck = createOfferingCards();
    this.offeringCardsInPlay = [];
    this.usedOfferingCards = [];

    this.drawOfferingCards();
    this.initializePlayers();
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

  private initializePlayers() {
    const kitsuneCardsInDeck = shuffleArray(this.kitsuneCardsInDeck);

    this.player = {
      id: generateUUID(),
      kitsunCardsInDeck: kitsuneCardsInDeck.splice(
        0,
        kitsuneCardsInDeck.length / 2
      ),
      kitsunCardsInHand: [],
      kitsunCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: 0,
    };
    this.opponent = {
      id: generateUUID(),
      kitsunCardsInDeck: kitsuneCardsInDeck.splice(
        kitsuneCardsInDeck.length / 2,
        kitsuneCardsInDeck.length
      ),
      kitsunCardsInHand: [],
      kitsunCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: 1,
    };
  }

  public drawKitsuneCard(turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * (player.kitsunCardsInDeck.length || 0)
    );
    const pickedKitsuneCards = player.kitsunCardsInDeck.splice(randomIndex, 1);
    if (pickedKitsuneCards && pickedKitsuneCards[0]) {
      player.kitsunCardsInHand.push(pickedKitsuneCards[0]);
    }
  }

  public discardOfferingCard(offeringCard: OfferingCard) {
    this.usedOfferingCards.push(offeringCard);
    this.offeringCardsInPlay = this.offeringCardsInPlay.filter(
      (card) => card.id !== offeringCard.id
    );
    this.drawOfferingCards();
  }

  /**
   *
   * @param kituneCard
   * @param offeringCards
   * @returns
   */
  public calculateEarningPoints(
    kitsuneCard: KitsuneCard,
    offeringCards: OfferingCard[]
  ): number {
    const sumNumber = offeringCards.reduce((sum, offeringCard) => {
      return sum + offeringCard.number;
    }, 0);

    if (sumNumber === kitsuneCard.number) {
      // Sum of number matches
      let points = offeringCards.length;
      for (let i = 0; i < offeringCards.length; i++) {
        if (offeringCards[i].symbol === kitsuneCard.symbol) {
          points += 1;
        }
      }
      return points;
    } else {
      let symbolMatches = true;
      for (const offeringCard of offeringCards) {
        // Symbol matches
        if (kitsuneCard.symbol !== offeringCard.symbol) {
          symbolMatches = false;
          break;
        }
      }
      if (symbolMatches) {
        return offeringCards.length;
      } else {
        return 0;
      }
    }
  }

  public placeAndActivateKitsuneCard(
    kitsuneCard: KitsuneCard,
    offeringCards: OfferingCard[],
    turns: number
  ): boolean {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return false;
    }
    if (player.kitsunCardsInPlay.length >= NumOfKitsuneCardsInPlay) {
      return false;
    }

    const earningPoints = this.calculateEarningPoints(
      kitsuneCard,
      offeringCards
    );
    if (earningPoints <= 0) {
      return false;
    }

    player.kitsunCardsInPlay.push(kitsuneCard);
    player.kitsunCardsInHand = player.kitsunCardsInHand.filter(
      (card) => card.id !== kitsuneCard.id
    );
    player.gamePoints += earningPoints;
    return true;
  }
}
