import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardHeight,
  KitsuneCardsInDeckHeight,
  KitsuneCardsInDeckLeft,
  KitsuneCardsInDeckTop,
  KitsuneCardsInDeckWidth,
  KitsuneCardWidth,
  OpponentKitsuneCardsInDeckLeft,
  OpponentKitsuneCardsInDeckTop,
} from "../lib/constants";
import KitsuneCardBack from "../assets/images/kitsunes/back.jpg";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInDeck(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const cards =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsunCardsInDeck
      : boardContainer.board.player?.kitsunCardsInDeck) || [];

  return (
    <div
      className={
        "absolute tooltip " +
        (props.isOpponent ? "tooltip-bottom" : "tooltip-right")
      }
      data-tip="Kitsune cards in deck"
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
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {new Array(Math.min(cards.length, 3))
        .fill(null)
        .map((val: any, index: number) => {
          return (
            <div
              key={`kitsune-cards-in-deck-${index}`}
              className={`absolute card shadow-sm shadow-black rounded-sm`}
              style={{
                transform: `rotate(${index * 10}deg)`,
              }}
            >
              <img
                src={KitsuneCardBack}
                alt={"Kitsune cards in deck"}
                style={{
                  width: gameContainer.zoom * KitsuneCardWidth * 0.7,
                  height: gameContainer.zoom * KitsuneCardHeight * 0.7,
                }}
              ></img>
            </div>
          );
        })}
    </div>
  );
}
