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
import OfferingCardBack from "../assets/images/offerings/back.jpg";

export default function UsedOfferingCards() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  return (
    <div
      className="absolute tooltip"
      data-tip="Used offering cards"
      style={{
        width: gameContainer.zoom * UsedOfferingCardsInDeckWidth,
        height: gameContainer.zoom * UsedOfferingCardsInDeckHeight,
        left: gameContainer.zoom * UsedOfferingCardsInDeckLeft,
        top: gameContainer.zoom * UsedOfferingCardsInDeckTop,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {new Array(Math.min(boardContainer.board.usedOfferingCards.length, 3))
        .fill(null)
        .map((val: any, index: number) => {
          return (
            <div
              key={`offering-cards-in-deck-${index}`}
              className={"absolute card shadow-sm shadow-black rounded-sm"}
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
