import { randomID } from "@0xgg/korona";
import {
  NumOfKitsuneCardsInDeckPerPlayer,
  NumOfKitsuneCardsInPlay,
  NumOfOfferingCardsInPlay,
  PlayerId,
  Tail6DarkShowEnemyKitsuneCardsTurns,
  Tail6LightHidePlayerKitsuneCardsTurns,
  Tail7DarkLockEnemyKitsuneCardsturns,
  Tail7LightSpellExtraKitsuneCardsInPlayTurns,
  Tail9LightSpellExtraOfferingCardsToDraw,
} from "./constants";
import {
  createKitsuneCards,
  KitsuneCard,
  kitsuneCardIsLightType,
} from "./kitsune";
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
    /*
    const kitsuneCardsInDeck = shuffleArray(kitsuneCards).slice(
      0,
      NumOfKitsuneCardsInDeckPerPlayer * 2
    );
    */
    const lighKitsuneCards = shuffleArray(
      kitsuneCards.filter((card) => kitsuneCardIsLightType(card))
    ).slice(0, NumOfKitsuneCardsInDeckPerPlayer);
    const darkKitsuneCards = shuffleArray(
      kitsuneCards.filter((card) => !kitsuneCardIsLightType(card))
    ).slice(0, NumOfKitsuneCardsInDeckPerPlayer);

    let flag = Math.random() < 0.5;

    this.player = {
      id: playerId || PlayerId,
      kitsuneCardsInDeck: flag ? lighKitsuneCards : darkKitsuneCards,
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: flag ? 0 : 1,
      showKitsuneCardsInHand: 0,
      hideKitsuneCardsInPlay: 0,
      extraKitsuneCardsInPlay: 0,
    };
    this.opponent = {
      id: opponentId || generateUUID(),
      kitsuneCardsInDeck: flag ? darkKitsuneCards : lighKitsuneCards,
      kitsuneCardsInHand: [],
      kitsuneCardsInPlay: [],
      gamePoints: 0,
      turnRemainder: flag ? 1 : 0,
      showKitsuneCardsInHand: 0,
      hideKitsuneCardsInPlay: 0,
      extraKitsuneCardsInPlay: 0,
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

  public discardOfferingCard(offeringCard: OfferingCard, dontRedraw?: boolean) {
    this.usedOfferingCards.push(offeringCard);
    this.offeringCardsInPlay = this.offeringCardsInPlay.filter(
      (card) => card.id !== offeringCard.id
    );
    if (!dontRedraw) {
      this.drawOfferingCards();
    }
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
      player.kitsuneCardsInPlay.length <
        NumOfKitsuneCardsInPlay + (player.extraKitsuneCardsInPlay > 0 ? 1 : 0)
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

    kitsuneCard.ac = (kitsuneCard.ac || 0) + 1;

    return true;
  }

  public nextTurn() {
    this.turns += 1;

    function updateActor(actor: Player) {
      if (actor.showKitsuneCardsInHand > 0) {
        actor.showKitsuneCardsInHand -= 1;
      }
      if (actor.hideKitsuneCardsInPlay > 0) {
        actor.hideKitsuneCardsInPlay -= 1;
      }
      if (actor.extraKitsuneCardsInPlay > 0) {
        actor.extraKitsuneCardsInPlay -= 1;

        if (actor.extraKitsuneCardsInPlay === 0) {
          // Move extra card in play to hand
          if (actor.kitsuneCardsInPlay.length > NumOfKitsuneCardsInPlay) {
            const card = actor.kitsuneCardsInPlay.pop();
            if (card) {
              actor.kitsuneCardsInHand.push(card);
            }
          }
        }
      }

      const kitsuneCards = actor.kitsuneCardsInPlay.concat(
        actor.kitsuneCardsInHand
      );
      kitsuneCards.forEach((card) => {
        if (card.locked && card.locked > 0) {
          card.locked -= 1;
        }
      });
    }

    if (this.player) {
      updateActor(this.player);
    }

    if (this.opponent) {
      updateActor(this.opponent);
    }

    // tail 9 light spell effect
    // put extra offering cards in play back to deck
    while (this.offeringCardsInPlay.length > NumOfOfferingCardsInPlay) {
      const card = this.offeringCardsInPlay.pop();
      if (card) {
        this.offeringCardsInDeck.push(card);
      }
    }
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
   * Hide all of your cards for 2 turns
   * @param offeringCards
   * @param turns
   * @returns
   */
  public castTail6LightSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    player.hideKitsuneCardsInPlay = Tail6LightHidePlayerKitsuneCardsTurns + 1; // 2 turns
    player.showKitsuneCardsInHand = 0;
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Can place 1 more kitsune card for 4 turns
   * @param offeringCards
   * @param turns
   * @returns
   */
  public castTail7LightSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }
    player.extraKitsuneCardsInPlay =
      Tail7LightSpellExtraKitsuneCardsInPlayTurns + 1;
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Gain three points
   * @param offeringCards
   * @param turns
   */
  public castTail8LightSpell(offeringCards: OfferingCard[], turns: number) {
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
   * Draw three offerings, then put them back in any order
   * @param offeringCards
   * @param turns
   */
  public castTail9LightSpell(offeringCards: OfferingCard[], turns: number) {
    // already casted once in this turn
    if (this.offeringCardsInPlay.length > NumOfOfferingCardsInPlay) {
      return;
    }

    const player =
      turns % 2 === this.player?.turnRemainder ? this.player : this.opponent;
    if (!player) {
      return;
    }

    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard, true);
    });

    // Add three more offerings
    for (let i = 0; i < Tail9LightSpellExtraOfferingCardsToDraw; i++) {
      if (
        this.offeringCardsInPlay.length >=
        NumOfOfferingCardsInPlay + Tail9LightSpellExtraOfferingCardsToDraw
      ) {
        break;
      }

      const drawIndex = Math.floor(
        Math.random() * this.offeringCardsInDeck.length
      );
      const drawnCard = this.offeringCardsInDeck.splice(drawIndex, 1)[0];
      this.offeringCardsInPlay.push(drawnCard);
    }
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

  /**
   * Show all of enemy cards for 2 turns
   * @param offeringCards
   * @param turns
   */
  public castTail6DarkSpell(offeringCards: OfferingCard[], turns: number) {
    const enemy =
      turns % 2 === this.player?.turnRemainder ? this.opponent : this.player;
    if (!enemy) {
      return;
    }
    enemy.showKitsuneCardsInHand = Tail6DarkShowEnemyKitsuneCardsTurns + 1; // 2 turns
    enemy.hideKitsuneCardsInPlay = 0;
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Return target card to its owners hand and lock for ${Tail7DarkLockEnemyKitsuneCardsturns} turns
   */
  public castTail7DarkSpell(
    targetKitsuneCard: KitsuneCard,
    offeringCards: OfferingCard[],
    turns: number
  ) {
    const enemy =
      turns % 2 === this.player?.turnRemainder ? this.opponent : this.player;
    if (!enemy) {
      return;
    }

    const index = enemy.kitsuneCardsInPlay.indexOf(targetKitsuneCard);

    // TODO: Validate index
    if (index >= 0) {
      enemy.kitsuneCardsInPlay.splice(index, 1);
      enemy.kitsuneCardsInHand.push(targetKitsuneCard);

      targetKitsuneCard.locked = Tail7DarkLockEnemyKitsuneCardsturns;
    }
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Enemy loses three point
   */
  public castTail8DarkSpell(offeringCards: OfferingCard[], turns: number) {
    const player =
      turns % 2 === this.player?.turnRemainder ? this.opponent : this.player;
    if (!player) {
      return;
    }
    player.gamePoints = Math.max(player.gamePoints - 3, 0);
    offeringCards.forEach((offeringCard) => {
      this.discardOfferingCard(offeringCard);
    });
  }

  /**
   * Discard all Offerings
   * @param offeringCards
   * @param turns
   */
  public castTail9DarkSpell() {
    const offeringCards = this.offeringCardsInPlay;
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
