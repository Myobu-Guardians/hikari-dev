import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardHeight,
  KitsuneCardsInHandHeight,
  KitsuneCardsInHandLeft,
  KitsuneCardsInHandTop,
  KitsuneCardsInHandWidth,
  KitsuneCardWidth,
  OpponentKitsuneCardsInHandLeft,
  OpponentKitsuneCardsInHandTop,
} from "../lib/constants";
import KitsuneCardBack from "../assets/images/kitsunes/back.jpg";
import KitsuneCardComponent from "./KitsuneCard";

interface Props {
  isOpponent?: boolean;
}
export default function KitsuneCardsInHand(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  const cards =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsunCardsInHand
      : boardContainer.board.player?.kitsunCardsInHand) || [];

  return (
    <div
      className={
        "absolute tooltip " +
        (props.isOpponent ? "tooltip-right" : "tooltip-top")
      }
      data-tip="Kitsune cards in hand"
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
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {props.isOpponent ? (
        new Array(Math.min(cards.length, 3))
          .fill(null)
          .map((val: any, index: number) => {
            return (
              <div
                key={`kitsune-cards-in-deck-${index}`}
                className={`absolute card shadow-sm shadow-black rounded-sm scale-90`}
                style={{ left: index * 20 }}
              >
                <img
                  src={KitsuneCardBack}
                  alt={"Kitsune cards in hands"}
                  style={{
                    width: gameContainer.zoom * KitsuneCardWidth * 0.8,
                    height: gameContainer.zoom * KitsuneCardHeight * 0.8,
                  }}
                ></img>
              </div>
            );
          })
      ) : (
        <div>
          {cards.map((card, index: number) => {
            const mid = Math.floor(cards.length / 2);
            return (
              <div
                key={`kitsune-card-in-hand-${index}-` + card.imageSrc}
                className={"absolute"}
                style={{
                  left: (index * gameContainer.zoom * KitsuneCardWidth) / 2,
                  transform: `rotate(${(index - mid) * 10}deg) scale(75%)`,
                }}
              >
                <KitsuneCardComponent kitsuneCard={card}></KitsuneCardComponent>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
