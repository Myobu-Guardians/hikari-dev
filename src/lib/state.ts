import { Player, PlayerProfile, PlayerProfileRole } from "./player";
import { OfferingCard } from "./offering";
import { SpellId } from "./spells";
import { GitCommit } from "../git_commit";

export type GameMode = "remote" | "local";

export type GameBoardState = {
  id: string;
  turns: number;
  offeringCardsInDeck: OfferingCard[];
  offeringCardsInPlay: OfferingCard[];
  usedOfferingCards: OfferingCard[];
  playerA: Player;
  playerB: Player;
  gameMode: GameMode;
};

export type GameStateAction =
  | {
      type: "CheckGameVersion";
      gitCommit: GitCommit;
    }
  | {
      type: "GameVersionsMismatch";
      gitCommit: GitCommit;
    }
  | {
      type: "StartGame";
      lightPlayer: PlayerProfile;
      darkPlayer: PlayerProfile;
    }
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
      type: "SetWalletAddress";
      walletAddress: string;
    }
  | {
      type: "ClickOfferingCard";
      cardId: string;
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
      type: "SendMessage";
      from: string;
      message: string;
    }
  | {
      type: "PlayAsRole";
      role: PlayerProfileRole;
      walletAddress: string;
    }
  | {
      type: "InitializePrivateRoom";
      players: PlayerProfile[];
      board?: GameBoardState;
    }
  | {
      type: "PlayerJoinedRoom";
      player: PlayerProfile;
    };
