import React, { useState } from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  BoardWidth,
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
  // Show the kitsune cards in hand for `showKitsuneCards` turns
  showKitsuneCards: number;
}
export default function KitsuneCardsInHand(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const [mouseOverCard, setMouseOverCard] = useState<KitsuneCard | null>(null);

  const cards =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsuneCardsInHand
      : boardContainer.board.player?.kitsuneCardsInHand) || [];

  const canSelect =
    (boardContainer.isPlayerTurn && !props.isOpponent) ||
    (!boardContainer.isPlayerTurn &&
      props.isOpponent &&
      boardContainer.board.gameMode === "local");

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
      {props.showKitsuneCards <= 0 &&
      props.isOpponent &&
      boardContainer.board.gameMode !== "local" ? (
        <div>
          {new Array(cards.length).fill(null).map((val: any, index: number) => {
            const mid = Math.floor(cards.length / 2);
            return (
              <div
                key={`kitsune-cards-in-deck-${index}`}
                className={
                  `absolute card shadow-sm shadow-black rounded-sm ` +
                  (canSelect ? "" : "cursor-not-allowed")
                }
                style={{
                  left: (index * gameContainer.zoom * KitsuneCardWidth) / 3,
                  transform: `rotate(${(index - mid) * 10}deg) scale(60%)`,
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
                key={`kitsune-card-in-hand-${index}-` + card.id}
                className={
                  "absolute " +
                  (!card.locked &&
                  boardContainer.highlightedKitsuneCards.has(card) &&
                  !(
                    boardContainer.isSelectingKitsuneCardToCastSpellAt ||
                    boardContainer.isSelectingKitsuneCardToReplace
                  )
                    ? "cursor-pointer"
                    : "cursor-not-allowed") +
                  " " +
                  (boardContainer.highlightedKitsuneCards.has(card)
                    ? "transition-all duration-300"
                    : "") +
                  " " +
                  " hover:rotate-0 hover:transition-all hover:z-[100]"
                }
                style={{
                  left: (index * gameContainer.zoom * KitsuneCardWidth) / 3,
                  transform:
                    mouseOverCard === card ||
                    boardContainer.selectedKitsuneCardToActivate === card
                      ? `translateY(${
                          props.isOpponent
                            ? 40 * gameContainer.zoom
                            : -40 * gameContainer.zoom
                        }px) translateX(${
                          props.isOpponent
                            ? 30 * gameContainer.zoom
                            : 30 * gameContainer.zoom
                        }px) scale(150%)`
                      : `rotate(${(index - mid) * 10}deg) scale(75%)`,
                  zIndex:
                    mouseOverCard === card ||
                    boardContainer.selectedKitsuneCardToActivate === card
                      ? 100
                      : 0,
                }}
                onMouseEnter={() => {
                  setMouseOverCard(card);
                }}
                onMouseLeave={() => {
                  setMouseOverCard(null);
                }}
                onClick={() => {
                  if (
                    card.locked ||
                    boardContainer.isSelectingKitsuneCardToCastSpellAt ||
                    boardContainer.isSelectingKitsuneCardToReplace
                  ) {
                    return;
                  }
                  if (boardContainer.highlightedKitsuneCards.has(card)) {
                    boardContainer.placeAndActivateKitsuneCard(card);
                  }
                }}
                title={
                  earningPoints > 0 && canSelect
                    ? `Activate to earn ${earningPoints} points`
                    : ""
                }
              >
                <KitsuneCardComponent
                  kitsuneCard={card}
                  earningPoints={
                    !boardContainer.isSelectingKitsuneCardToReplace &&
                    !boardContainer.isSelectingKitsuneCardToCastSpellAt &&
                    !boardContainer.isSelectingKitsuneCardToCastSpell &&
                    earningPoints &&
                    canSelect
                      ? earningPoints
                      : undefined
                  }
                  isInPlay={
                    mouseOverCard === card ||
                    boardContainer.selectedKitsuneCardToActivate === card ||
                    cards.length === 1
                      ? true
                      : false
                  }
                  isOpponent={props.isOpponent}
                  showAnimation={mouseOverCard === card}
                  locked={card.locked}
                ></KitsuneCardComponent>
              </div>
            );
          })}
        </div>
      )}
      {props.showKitsuneCards > 0 && (
        <div
          className="text-white p-4 absolute text-center flex flex-row items-center justify-center"
          style={{
            fontSize: gameContainer.zoom * 18,
            width: (gameContainer.zoom * BoardWidth) / 4,
            height: gameContainer.zoom * 40,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            top: "80%",
            left: "20%",
          }}
        >
          <div>Show for {props.showKitsuneCards} turns</div>
        </div>
      )}
    </div>
  );
}
