import React from "react";
import { GameContainer } from "../containers/game";
import {
  UsedOfferingCardsInDeckHeight,
  UsedOfferingCardsInDeckLeft,
  UsedOfferingCardsInDeckTop,
  UsedOfferingCardsInDeckWidth,
} from "../lib/constants";

export default function UsedOfferingCards() {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * UsedOfferingCardsInDeckWidth,
        height: gameContainer.zoom * UsedOfferingCardsInDeckHeight,
        left: gameContainer.zoom * UsedOfferingCardsInDeckLeft,
        top: gameContainer.zoom * UsedOfferingCardsInDeckTop,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
