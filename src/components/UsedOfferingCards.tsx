import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  OfferingCardSize,
  UsedOfferingCardsInDeckHeight,
  UsedOfferingCardsInDeckLeft,
  UsedOfferingCardsInDeckTop,
  UsedOfferingCardsInDeckWidth,
} from "../lib/constants";
import { asciiStringToNumber } from "../lib/utils";
import OfferingCardBack from "../assets/images/offerings/back.png";

export default function UsedOfferingCards() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const canDiscard = boardContainer.selectedOfferingCards.size === 1;

  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * UsedOfferingCardsInDeckWidth,
        height: gameContainer.zoom * UsedOfferingCardsInDeckHeight,
        left: gameContainer.zoom * UsedOfferingCardsInDeckLeft,
        top: gameContainer.zoom * UsedOfferingCardsInDeckTop,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {(canDiscard || boardContainer.board.usedOfferingCards.length === 0) && (
        <div
          className={
            "absolute border-4 border-dashed text-white text-center " +
            (canDiscard
              ? "cursor-pointer border-red-500 z-50"
              : "cursor-not-allowed border-white")
          }
          style={{
            width: gameContainer.zoom * OfferingCardSize,
            height: gameContainer.zoom * OfferingCardSize,
          }}
        >
          <div
            className="absolute bottom-2 left-6"
            style={{
              fontSize: gameContainer.zoom * 16,
            }}
            onClick={() => {
              if (canDiscard) {
                boardContainer.discardSelectedOfferingCard();
              }
            }}
          >
            {canDiscard ? "Click here to discard" : "Used Offering"}
          </div>
        </div>
      )}
      {new Array(Math.min(boardContainer.board.usedOfferingCards.length, 3))
        .fill(null)
        .map((val: any, index: number) => {
          return (
            <div
              key={`offering-cards-in-deck-${index}`}
              className={
                "absolute card shadow-sm shadow-black rounded-sm cursor-not-allowed"
              }
              style={{
                transform: `rotate(${
                  (boardContainer.board.usedOfferingCards.length -
                    index +
                    asciiStringToNumber(
                      boardContainer.board.usedOfferingCards[index].imageSrc
                    )) *
                  10
                }deg)`,
              }}
            >
              <img
                src={OfferingCardBack}
                alt={"Offering cards in deck"}
                style={{
                  width: gameContainer.zoom * OfferingCardSize,
                  height: gameContainer.zoom * OfferingCardSize,
                }}
              ></img>
            </div>
          );
        })}
    </div>
  );
}
