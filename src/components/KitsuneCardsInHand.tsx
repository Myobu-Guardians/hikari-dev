import React from "react";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInHandHeight,
  KitsuneCardsInHandLeft,
  KitsuneCardsInHandTop,
  KitsuneCardsInHandWidth,
  OpponentKitsuneCardsInHandLeft,
  OpponentKitsuneCardsInHandTop,
} from "../lib/constants";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInHand(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="absolute"
      style={{
        width: gameContainer.zoom * KitsuneCardsInHandWidth,
        height: gameContainer.zoom * KitsuneCardsInHandHeight,
        left:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInHandLeft
            : KitsuneCardsInHandLeft),
        top:
          gameContainer.zoom *
          (props.isOpponent
            ? OpponentKitsuneCardsInHandTop
            : KitsuneCardsInHandTop),
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    ></div>
  );
}
