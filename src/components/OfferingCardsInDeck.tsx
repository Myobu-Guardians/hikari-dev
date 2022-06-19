import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  OfferingCardsInDeckHeight,
  OfferingCardsInDeckLeft,
  OfferingCardsInDeckTop,
  OfferingCardsInDeckWidth,
  OfferingCardSize,
} from "../lib/constants";
import OfferingCardBack from "../assets/images/offerings/back.png";
import { asciiStringToNumber } from "../lib/utils";

export default function OfferingCardsInDeck() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  return (
    <div
      className="absolute tooltip cursor-not-allowed"
      data-tip="Offering cards in deck"
      style={{
        width: gameContainer.zoom * OfferingCardsInDeckWidth,
        height: gameContainer.zoom * OfferingCardsInDeckHeight,
        left: gameContainer.zoom * OfferingCardsInDeckLeft,
        top: gameContainer.zoom * OfferingCardsInDeckTop,
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {new Array(Math.min(boardContainer.board.offeringCardsInDeck.length, 3))
        .fill(null)
        .map((val: any, index: number) => {
          return (
            <div
              key={`offering-cards-in-deck-${index}`}
              className={"absolute card shadow-sm shadow-black rounded-sm"}
              style={{
                transform: `rotate(${
                  (boardContainer.board.offeringCardsInDeck.length -
                    index +
                    asciiStringToNumber(
                      boardContainer.board.offeringCardsInDeck[index].imageSrc
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
