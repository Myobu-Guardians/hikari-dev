import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  OfferingCardsInPlayHeight,
  OfferingCardsInPlayLeft,
  OfferingCardsInPlayTop,
  OfferingCardsInPlayWidth,
} from "../lib/constants";
import OfferingCardComponent from "./OfferingCard";

export default function OfferingCardsInPlay() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  let canSelect =
    boardContainer.isPlayerTurn ||
    (!boardContainer.isPlayerTurn && boardContainer.board.gameMode === "local"); // TODO: if remote and opponent then false

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
        {boardContainer.board.offeringCardsInPlay.map((offeringCard) => {
          return (
            <div
              key={offeringCard.id}
              onClick={() => {
                if (canSelect) {
                  boardContainer.toggleOfferingCard(offeringCard);
                }
              }}
              className={
                boardContainer.selectedOfferingCards.has(offeringCard)
                  ? "border-[6px] box-border border-orange-400 transition-all duration-200"
                  : ""
              }
            >
              <OfferingCardComponent
                offeringCard={offeringCard}
              ></OfferingCardComponent>
            </div>
          );
        })}
      </div>
    </div>
  );
}
