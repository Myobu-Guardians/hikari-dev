import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInPlayHeight,
  KitsuneCardsInPlayLeft,
  KitsuneCardsInPlayTop,
  KitsuneCardsInPlayWidth,
  KitsuneCardWidth,
  NumOfKitsuneCardsInPlay,
  OpponentKitsuneCardsInPlayLeft,
  OpponentKitsuneCardsInPlayTop,
} from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import { canCastSpell } from "../lib/spellFn";
import KitsuneCardComponent from "./KitsuneCard";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInPlay(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  const cards: KitsuneCard[] =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsuneCardsInPlay
      : boardContainer.board.player?.kitsuneCardsInPlay) || [];

  const canSelect =
    (boardContainer.isPlayerTurn && !props.isOpponent) ||
    (!boardContainer.isPlayerTurn &&
      props.isOpponent &&
      boardContainer.board.gameMode === "local");

  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * KitsuneCardsInPlayWidth,
        height: gameContainer.zoom * KitsuneCardsInPlayHeight,
        left:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInPlayLeft
            : KitsuneCardsInPlayLeft),
        top:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInPlayTop
            : KitsuneCardsInPlayTop),
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="w-full flex flex-row items-center justify-evenly">
        {cards.map((card, index) => {
          const earningPoints = boardContainer.board.calculateEarningPoints(
            card,
            Array.from(boardContainer.selectedOfferingCards)
          );
          const canCastSpell_ = canCastSpell(
            card,
            Array.from(boardContainer.selectedOfferingCards)
          );
          return (
            <div
              key={`kitsune-card-in-play-${index}-` + card.id}
              className={
                boardContainer.isSelectingKitsuneCardToCastSpellAt
                  ? "cursor-pointer"
                  : boardContainer.isSelectingKitsuneCardToReplace && canSelect
                  ? "cursor-pointer"
                  : (boardContainer.highlightedKitsuneCards.has(card)
                      ? "cursor-pointer transition-all duration-300"
                      : "cursor-not-allowed") + " relative"
              }
              onClick={() => {
                if (
                  canSelect &&
                  boardContainer.isSelectingKitsuneCardToReplace &&
                  boardContainer.selectedKitsuneCardToActivate
                ) {
                  boardContainer.placeAndActivateKitsuneCard(
                    boardContainer.selectedKitsuneCardToActivate,
                    card
                  );
                } else if (
                  canSelect &&
                  boardContainer.highlightedKitsuneCards.has(card)
                ) {
                  boardContainer.placeAndActivateKitsuneCard(card);
                } else if (boardContainer.isSelectingKitsuneCardToCastSpellAt) {
                  boardContainer.castSpellAtKitsuneCard(card);
                }
              }}
            >
              <KitsuneCardComponent
                kitsuneCard={card}
                earningPoints={
                  canSelect &&
                  !boardContainer.isSelectingKitsuneCardToReplace &&
                  !boardContainer.isSelectingKitsuneCardToCastSpellAt &&
                  earningPoints > 0
                    ? earningPoints
                    : undefined
                }
                isInPlay={true}
                showHint={
                  canSelect && boardContainer.isSelectingKitsuneCardToReplace
                    ? "Replace this card"
                    : boardContainer.isSelectingKitsuneCardToCastSpellAt
                    ? "Target this card"
                    : ""
                }
                showCastSpell={
                  canSelect &&
                  !boardContainer.isSelectingKitsuneCardToReplace &&
                  !boardContainer.isSelectingKitsuneCardToCastSpellAt &&
                  canCastSpell_
                }
                isOpponent={props.isOpponent}
              ></KitsuneCardComponent>
            </div>
          );
        })}
        {
          /*!props.isOpponent &&*/
          new Array(Math.max(0, NumOfKitsuneCardsInPlay - cards.length))
            .fill(null)
            .map((val: any, index: number) => {
              return (
                <div
                  key={`empty-slot-${index}`}
                  className={`border-dashed border-white text-white relative`}
                  style={{
                    width: gameContainer.zoom * KitsuneCardWidth,
                    height: (221 / 137) * gameContainer.zoom * KitsuneCardWidth,
                    borderWidth: gameContainer.zoom * 3,
                  }}
                >
                  <div
                    className="absolute bottom-0 right-2"
                    style={{
                      fontSize: gameContainer.zoom * 16,
                    }}
                  >
                    Activated<br></br>Kitsune
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
}
