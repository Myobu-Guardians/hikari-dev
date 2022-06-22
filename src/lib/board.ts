import {
  NumOfKitsuneCardsInDeckPerPlayer,
  NumOfKitsuneCardsInPlay,
  NumOfOfferingCardsInPlay,
} from "./constants";
import { createKitsuneCards, KitsuneCard } from "./kitsune";
import { OfferingCard, createOfferingCards } from "./offering";
import { Player } from "./player";
import { generateUUID, shuffleArray } from "./utils";

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
    const kitsuneCardsInDeck = shuffleArray(this.kitsuneCardsInDeck).slice(
      0,
      NumOfKitsuneCardsInDeckPerPlayer * 2
    );

    this.player = {
      id: generateUUID(),
      kitsuneCardsInDeck: kitsuneCardsInDeck.slice(
        0,
        kitsuneCardsInDeck.length / 2
      ),
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: 0,
    };
    this.opponent = {
      id: generateUUID(),
      kitsuneCardsInDeck: kitsuneCardsInDeck.slice(
        kitsuneCardsInDeck.length / 2,
        kitsuneCardsInDeck.length
      ),
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
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
      Math.random() * (player.kitsuneCardsInDeck.length || 0)
    );
    const pickedKitsuneCards = player.kitsuneCardsInDeck.splice(randomIndex, 1);
    if (pickedKitsuneCards && pickedKitsuneCards[0]) {
      player.kitsuneCardsInHand.push(pickedKitsuneCards[0]);
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
    turns: number,
    replaceKitsuneCard?: KitsuneCard
  ): boolean {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return false;
    }

    /*
    if (player.kitsuneCardsInPlay.length >= NumOfKitsuneCardsInPlay) {
      return false;
    }
    */

    const earningPoints = this.calculateEarningPoints(
      kitsuneCard,
      offeringCards
    );
    if (earningPoints <= 0) {
      return false;
    }

    if (
      player.kitsuneCardsInPlay.indexOf(kitsuneCard) < 0 &&
      player.kitsuneCardsInPlay.length < NumOfKitsuneCardsInPlay
    ) {
      player.kitsuneCardsInPlay.push(kitsuneCard);
    }

    if (replaceKitsuneCard) {
      const replaceIndex =
        player.kitsuneCardsInPlay.indexOf(replaceKitsuneCard);
      if (replaceIndex >= 0) {
        player.kitsuneCardsInPlay[replaceIndex] = kitsuneCard;
      }

      const replaceIndexInHand = player.kitsuneCardsInHand.indexOf(kitsuneCard);
      if (replaceIndexInHand >= 0) {
        player.kitsuneCardsInHand[replaceIndexInHand] = replaceKitsuneCard;
      }
    } else {
      player.kitsuneCardsInHand = player.kitsuneCardsInHand.filter(
        (card) => card.id !== kitsuneCard.id
      );
    }

    player.gamePoints += earningPoints;

    for (let i = 0; i < offeringCards.length; i++) {
      this.discardOfferingCard(offeringCards[i]);
    }

    return true;
  }
}
