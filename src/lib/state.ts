import { Player } from "./player";
import { OfferingCard } from "./offering";
import { SpellId } from "./spells";

export type GameBoardState = {
  offeringCardsInDeck: OfferingCard[];
  playerA: Player;
  playerB: Player;
  turns: number;
};

export type GameStateAction =
  | {
      type: "CreateBoard";
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
    };
