import { randomID } from "@0xgg/korona";
import {
  NumOfKitsuneCardsInDeckPerPlayer,
  NumOfKitsuneCardsInPlay,
  NumOfOfferingCardsInPlay,
  PlayerId,
} from "./constants";
import { createKitsuneCards, KitsuneCard } from "./kitsune";
import { OfferingCard, createOfferingCards } from "./offering";
import { Player } from "./player";
import { GameBoardState } from "./state";
import { generateUUID, shuffleArray } from "./utils";

export type GameMode = "remote" | "local";

export class GameBoard {
  id = randomID();
  offeringCardsInDeck: OfferingCard[] = [];
  offeringCardsInPlay: OfferingCard[] = [];
  usedOfferingCards: OfferingCard[] = [];
  player?: Player = undefined;
  opponent?: Player = undefined;
  turns: number = 0;
  gameMode: GameMode = "local";

  constructor() {
    this.initializeBoardForLocalPlay();
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

  public initializeBoardForLocalPlay() {
    this.id = randomID();
    const kitsuneCardsInDeck = createKitsuneCards();
    this.offeringCardsInDeck = createOfferingCards();
    this.offeringCardsInPlay = [];
    this.usedOfferingCards = [];
    this.turns = 0;
    this.gameMode = "local";

    this.drawOfferingCards();
    this.initializePlayers(kitsuneCardsInDeck);
  }

  public initializeBoardForPvP(hostId: string, guestId: string) {
    this.id = randomID();
    const kitsuneCardsInDeck = createKitsuneCards();
    this.offeringCardsInDeck = createOfferingCards();
    this.offeringCardsInPlay = [];
    this.usedOfferingCards = [];
    this.turns = 0;
    this.gameMode = "remote";

    this.drawOfferingCards();

    let playerId = hostId;
    let opponentId = guestId;
    this.initializePlayers(kitsuneCardsInDeck, playerId, opponentId);
  }

  public saveState(): GameBoardState | null {
    if (!this.player || !this.opponent) {
      return null;
    }

    return {
      id: this.id,
      turns: this.turns,
      offeringCardsInDeck: [...this.offeringCardsInDeck],
      offeringCardsInPlay: [...this.offeringCardsInPlay],
      usedOfferingCards: [...this.usedOfferingCards],
      playerA: JSON.parse(JSON.stringify(this.player)),
      playerB: JSON.parse(JSON.stringify(this.opponent)),
    };
  }

  public loadState(boardState: GameBoardState) {
    this.id = boardState.id;
    this.turns = boardState.turns;
    this.offeringCardsInDeck = boardState.offeringCardsInDeck;
    this.offeringCardsInPlay = boardState.offeringCardsInPlay;
    this.usedOfferingCards = boardState.usedOfferingCards;
    this.gameMode = "remote";
    if (PlayerId === boardState.playerA.id) {
      this.player = boardState.playerA;
      this.opponent = boardState.playerB;
    } else if (PlayerId === boardState.playerB.id) {
      this.player = boardState.playerB;
      this.opponent = boardState.playerA;
    } else {
      this.player = boardState.playerA;
      this.opponent = boardState.playerB;
    }
  }

  private initializePlayers(
    kitsuneCards: KitsuneCard[],
    playerId?: string,
    opponentId?: string
  ) {
    const kitsuneCardsInDeck = shuffleArray(kitsuneCards).slice(
      0,
      NumOfKitsuneCardsInDeckPerPlayer * 2
    );

    let flag = Math.random() < 0.5;

    this.player = {
      id: playerId || PlayerId,
      kitsuneCardsInDeck: kitsuneCardsInDeck.slice(
        0,
        kitsuneCardsInDeck.length / 2
      ),
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: flag ? 0 : 1,
    };
    this.opponent = {
      id: opponentId || generateUUID(),
      kitsuneCardsInDeck: kitsuneCardsInDeck.slice(
        kitsuneCardsInDeck.length / 2,
        kitsuneCardsInDeck.length
      ),
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: flag ? 1 : 0,
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
      return pickedKitsuneCards[0];
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
        if (
          !!kitsuneCard.symbols.find(
            (symbol) => symbol === offeringCards[i].symbol
          )
        ) {
          points += 1;
        }
      }
      return points;
    } else {
      let symbolMatches = true;
      for (const offeringCard of offeringCards) {
        // Symbol matches
        if (
          !kitsuneCard.symbols.find((symbol) => symbol === offeringCard.symbol)
        ) {
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

  public nextTurn() {
    this.turns += 1;
  }

  public getPreviousActionInitiatorId() {
    if ((this.turns - 1) % 2 === this.player?.turnRemainder) {
      return this.player.id;
    } else {
      return this.opponent?.id || "";
    }
  }

  /**
   * Gain one point
   * @param offeringCards
   * @param turns
   */
  public castTail1LightSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    player.gamePoints += 1;
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Increase any card number by three
   * @param targetKitsuneCard
   * @param offeringCards
   * @param turns
   * @returns
   */
  public castTail2LightSpell(
    targetKitsuneCard: KitsuneCard,
    offeringCards: OfferingCard[],
    turns: number
  ) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    targetKitsuneCard.number = Math.min(targetKitsuneCard.number + 3, 9); // Can't greater than 9
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Gain three points
   * @param offeringCards
   * @param turns
   */
  public castTail7LightSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    player.gamePoints += 3;
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Enemy loses one point
   */
  public castTail1DarkSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.opponent : this.player;
    if (!player) {
      return;
    }
    player.gamePoints = Math.max(player.gamePoints - 1, 0);
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Decrease any card number by three
   * @param targetKitsuneCard
   * @param offeringCards
   * @param turns
   * @returns
   */
  public castTail2DarkSpell(
    targetKitsuneCard: KitsuneCard,
    offeringCards: OfferingCard[],
    turns: number
  ) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    targetKitsuneCard.number = Math.max(targetKitsuneCard.number - 3, 1); // TODO: Can it be below 1?
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  public getOfferingCardById(offeringCardId: string): OfferingCard | undefined {
    return [...this.offeringCardsInDeck, ...this.offeringCardsInPlay].find(
      (offeringCard) => offeringCard.id === offeringCardId
    );
  }

  public getKitsuneCardById(kitsuneCardId: string): KitsuneCard | undefined {
    return [
      ...(this.player?.kitsuneCardsInDeck || []),
      ...(this.player?.kitsuneCardsInPlay || []),
      ...(this.player?.kitsuneCardsInHand || []),
      ...(this.opponent?.kitsuneCardsInDeck || []),
      ...(this.opponent?.kitsuneCardsInPlay || []),
      ...(this.opponent?.kitsuneCardsInHand || []),
    ].find((kitsuneCard) => kitsuneCard.id === kitsuneCardId);
  }
}
