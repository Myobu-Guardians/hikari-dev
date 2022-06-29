import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  NumOfOfferingCardsInPlay,
  OfferingCardsInPlayHeight,
  OfferingCardsInPlayLeft,
  OfferingCardsInPlayTop,
  OfferingCardsInPlayWidth,
  Tail9DarkLockedOfferingCardsNum,
} from "../lib/constants";
import OfferingCardComponent from "./OfferingCard";

export default function OfferingCardsInPlay() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  let canSelect =
    boardContainer.isPlayerTurn || boardContainer.board.gameMode === "local"; // TODO: if remote and opponent then false

  const lockTurns =
    boardContainer.board.player?.lockOfferingCardsInPlay ||
    boardContainer.board.opponent?.lockOfferingCardsInPlay ||
    0;

  const lockedActor = boardContainer.board.player?.lockOfferingCardsInPlay
    ? boardContainer.board.player
    : boardContainer.board.opponent?.lockOfferingCardsInPlay
    ? boardContainer.board.opponent
    : null;

  const actor = boardContainer.isPlayerTurn
    ? boardContainer.board.player
    : boardContainer.board.opponent;

  return (
    <div
      className="absolute"
      style={{
        left: gameContainer.zoom * OfferingCardsInPlayLeft,
        top: gameContainer.zoom * OfferingCardsInPlayTop,
        width: gameContainer.zoom * OfferingCardsInPlayWidth,
        height: gameContainer.zoom * OfferingCardsInPlayHeight,
        // backgroundColor: "rgb(233 30 99 / 36%)",
      }}
    >
      <div className={"w-full flex flex-row items-center justify-evenly "}>
        {boardContainer.board.offeringCardsInPlay.map(
          (offeringCard, index, self) => {
            let locked =
              actor === lockedActor &&
              lockTurns > 0 &&
              index >= self.length - Tail9DarkLockedOfferingCardsNum;

            return (
              <div
                key={offeringCard.id}
                onClick={() => {
                  if (
                    locked ||
                    boardContainer.isSelectingKitsuneCardToReplace ||
                    boardContainer.isSelectingKitsuneCardToCastSpellAt
                  ) {
                    return;
                  }
                  if (canSelect) {
                    boardContainer.toggleOfferingCard(offeringCard);
                  }
                }}
                className={
                  (canSelect && !locked
                    ? "cursor-pointer"
                    : "cursor-not-allowed") +
                  " " +
                  (boardContainer.selectedOfferingCards.has(offeringCard)
                    ? `border-[6px] box-border transition-all duration-200 ` +
                      (boardContainer.isPlayerTurn
                        ? "border-orange-400"
                        : "border-blue-400")
                    : "") +
                  " " +
                  (boardContainer.board.offeringCardsInPlay.length >
                  NumOfOfferingCardsInPlay
                    ? "scale-75"
                    : "")
                }
              >
                <OfferingCardComponent
                  offeringCard={offeringCard}
                  locked={
                    lockTurns > 0 &&
                    index >= self.length - Tail9DarkLockedOfferingCardsNum
                      ? lockTurns
                      : 0
                  }
                ></OfferingCardComponent>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
