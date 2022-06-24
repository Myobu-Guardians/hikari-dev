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
      ? boardContainer.board.opponent?.kitsuneCardsInDeck
      : boardContainer.board.player?.kitsuneCardsInDeck) || [];

  const canDraw =
    (boardContainer.isPlayerTurn && !props.isOpponent) ||
    (!boardContainer.isPlayerTurn &&
      props.isOpponent &&
      boardContainer.board.gameMode === "local");

  return (
    <div
      className={
        "absolute " + (canDraw ? "cursor-pointer" : "cursor-not-allowed")
      }
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
        .map((val: any, index: number, self) => {
          return (
            <div
              key={`kitsune-cards-in-deck-${index}`}
              className={
                `absolute card shadow-sm shadow-black rounded-sm ` +
                (canDraw && index === self.length - 1
                  ? "hover:border-orange-400 hover:border-4 hover:transition-all "
                  : "")
              }
              style={{
                transform: `rotate(${index * 10}deg)`,
              }}
              title={canDraw ? "Draw a card" : ""}
              onClick={() => {
                if (canDraw) {
                  boardContainer.drawKitsuneCard();
                }
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
      {canDraw && cards.length > 0 && (
        <div
          className="text-white absolute"
          style={{
            fontSize: gameContainer.zoom * 12,
            top: gameContainer.zoom * 140,
            left: gameContainer.zoom * -10,
          }}
        >
          Draw Kitsune Card ^
        </div>
      )}
    </div>
  );
}
