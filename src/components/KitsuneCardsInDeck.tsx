import React from "react";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInDeckHeight,
  KitsuneCardsInDeckLeft,
  KitsuneCardsInDeckTop,
  KitsuneCardsInDeckWidth,
  OpponentKitsuneCardsInDeckLeft,
  OpponentKitsuneCardsInDeckTop,
} from "../lib/constants";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInDeck(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * KitsuneCardsInDeckWidth,
        height: gameContainer.zoom * KitsuneCardsInDeckHeight,
        left:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInDeckLeft
            : KitsuneCardsInDeckLeft),
        top:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInDeckTop
            : KitsuneCardsInDeckTop),
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
