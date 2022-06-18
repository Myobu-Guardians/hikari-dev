import React from "react";
import { GameContainer } from "../containers/game";
import {
  OfferingCardsInDeckHeight,
  OfferingCardsInDeckLeft,
  OfferingCardsInDeckTop,
  OfferingCardsInDeckWidth,
} from "../lib/constants";

export default function OfferingCardsInDeck() {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * OfferingCardsInDeckWidth,
        height: gameContainer.zoom * OfferingCardsInDeckHeight,
        left: gameContainer.zoom * OfferingCardsInDeckLeft,
        top: gameContainer.zoom * OfferingCardsInDeckTop,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
