import React from "react";
import { GameContainer } from "../containers/game";
import {
  OfferingCardsInDeckHeight,
  OfferingCardsInPlayLeft,
  OfferingCardsInPlayTop,
  OfferingCardsInPlayWidth,
} from "../lib/constants";

export default function OfferingCardsInPlay() {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="absolute"
      style={{
        left: gameContainer.zoom * OfferingCardsInPlayLeft,
        top: gameContainer.zoom * OfferingCardsInPlayTop,
        width: gameContainer.zoom * OfferingCardsInPlayWidth,
        height: gameContainer.zoom * OfferingCardsInDeckHeight,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
