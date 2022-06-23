import { Player } from "./player";
import { OfferingCard } from "./offering";
import { SpellId } from "./spells";

export type GameBoardState = {
  id: string;
  turns: number;
  offeringCardsInDeck: OfferingCard[];
  offeringCardsInPlay: OfferingCard[];
  usedOfferingCards: OfferingCard[];
  playerA: Player;
  playerB: Player;
};

export type GameStateAction =
  | {
      type: "CreateBoard";
      board: GameBoardState;
    }
  | {
      type: "UpdateBoard";
      playerId: string; // The id of player that initiated this action
      board: GameBoardState;
    }
  | {
      type: "DrawKitsuneCard";
      playerId: string;
      kitsuneCardId: string;
    }
  | {
      type: "ActivateKitsuneCard";
      playerId: string;
      kitsuneCardId: string;
      replacedKitsuneCardId?: string;
      usedOfferingCardIDs: string[];
      newOfferingCardIDs: string[];
    }
  | {
      type: "DiscardOfferingCard";
      playerId: string;
      offeringCardId: string;
      newOfferingCardId?: string;
    }
  | {
      type: "CastSpell";
      playerId: string;
      spellId: SpellId;
      usedOfferingCardIds: string[];
      args: any[];
    }
  | {
      type: "DontCastSpell";
      playerId: string;
      spellId: string;
    }
  | {
      type: "PassTurn";
      playerId: string;
    }
  | {
      type: "ClickKitsuneCard";
      playerId: string;
    }
  | {
      type: "ClickOfferingCard";
      playerId: string;
    }
  | {
      type: "SendMessage";
      from: string;
      message: string;
    };
