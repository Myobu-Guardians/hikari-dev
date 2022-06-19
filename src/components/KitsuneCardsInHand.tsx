import React, { useState } from "react";
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
import { KitsuneCard } from "../lib/kitsune";

interface Props {
  isOpponent?: boolean;
  showOpponentsCards?: boolean;
}
export default function KitsuneCardsInHand(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const [mouseOverCard, setMouseOverCard] = useState<KitsuneCard | null>(null);

  const cards =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsunCardsInHand
      : boardContainer.board.player?.kitsunCardsInHand) || [];

  const canSelect =
    (boardContainer.isPlayerTurn && !props.isOpponent) ||
    (!boardContainer.isPlayerTurn && props.isOpponent);

  return (
    <div
      className={"absolute"}
      title="Kitsune cards in hand"
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
      {props.isOpponent && !props.showOpponentsCards ? (
        <div>
          {new Array(Math.min(cards.length, 3))
            .fill(null)
            .map((val: any, index: number) => {
              const mid = Math.floor(cards.length / 2);
              return (
                <div
                  key={`kitsune-cards-in-deck-${index}`}
                  className={
                    `absolute card shadow-sm shadow-black rounded-sm ` +
                    (canSelect ? "" : "cursor-not-allowed")
                  }
                  style={{
                    left: (index * gameContainer.zoom * KitsuneCardWidth) / 2,
                    transform: `rotate(${(index - mid) * 10}deg) scale(75%)`,
                    width: gameContainer.zoom * KitsuneCardWidth,
                    height: gameContainer.zoom * KitsuneCardHeight,
                  }}
                >
                  <img
                    src={KitsuneCardBack}
                    alt={"Kitsune cards in hands"}
                    style={{
                      width: gameContainer.zoom * KitsuneCardWidth,
                      height: gameContainer.zoom * KitsuneCardHeight,
                    }}
                  ></img>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          {cards.map((card, index: number) => {
            const mid = Math.floor(cards.length / 2);
            const earningPoints = boardContainer.board.calculateEarningPoints(
              card,
              Array.from(boardContainer.selectedOfferingCards)
            );
            return (
              <div
                key={`kitsune-card-in-hand-${index}-` + card.imageSrc}
                className={
                  "absolute " +
                  (boardContainer.highlightedKitsuneCards.has(card)
                    ? "cursor-pointer"
                    : "cursor-not-allowed") +
                  " " +
                  (boardContainer.highlightedKitsuneCards.has(card)
                    ? "border-[8px] border-blue-500 transition-all duration-300"
                    : "") +
                  // ` rotate-[${(index - mid) * 10}deg] scale-75 ` +
                  " " +
                  " hover:scale-125 hover:rotate-0 hover:transition-all hover:z-[100]"
                }
                style={{
                  left: (index * gameContainer.zoom * KitsuneCardWidth) / 2.5,
                  transform:
                    mouseOverCard === card
                      ? `translateY(${props.isOpponent ? 20 : -20}px)`
                      : `rotate(${(index - mid) * 10}deg) scale(75%)`,
                }}
                onMouseEnter={() => {
                  setMouseOverCard(card);
                }}
                onMouseLeave={() => {
                  setMouseOverCard(null);
                }}
                onClick={() => {
                  if (boardContainer.highlightedKitsuneCards.has(card)) {
                    boardContainer.placeAndActivateKitsuneCard(card);
                  }
                }}
                title={
                  earningPoints > 0
                    ? `Activate to earn ${earningPoints} points`
                    : ""
                }
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
