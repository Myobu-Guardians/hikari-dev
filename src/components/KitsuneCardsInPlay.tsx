import React from "react";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInPlayHeight,
  KitsuneCardsInPlayLeft,
  KitsuneCardsInPlayTop,
  KitsuneCardsInPlayWidth,
  OpponentKitsuneCardsInPlayLeft,
  OpponentKitsuneCardsInPlayTop,
} from "../lib/constants";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInPlay(props: Props) {
  const gameContainer = GameContainer.useContainer();

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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
