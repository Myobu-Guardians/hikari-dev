import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInPlayHeight,
  KitsuneCardsInPlayLeft,
  KitsuneCardsInPlayTop,
  KitsuneCardsInPlayWidth,
  OpponentKitsuneCardsInPlayLeft,
  OpponentKitsuneCardsInPlayTop,
} from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import KitsuneCardComponent from "./KitsuneCard";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInPlay(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  const cards: KitsuneCard[] =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsunCardsInPlay
      : boardContainer.board.player?.kitsunCardsInPlay) || [];

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
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="w-full flex flex-row items-center justify-evenly">
        {cards.map((card, index) => {
          return (
            <div key={`kitsune-card-in-play-${index}-` + card.imageSrc}>
              <KitsuneCardComponent kitsuneCard={card}></KitsuneCardComponent>
            </div>
          );
        })}
      </div>
    </div>
  );
}
