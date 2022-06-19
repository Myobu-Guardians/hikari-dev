import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardsInPlayHeight,
  KitsuneCardsInPlayLeft,
  KitsuneCardsInPlayTop,
  KitsuneCardsInPlayWidth,
  KitsuneCardWidth,
  NumOfKitsuneCardsInPlay,
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
      ? boardContainer.board.opponent?.kitsuneCardsInPlay
      : boardContainer.board.player?.kitsuneCardsInPlay) || [];

  const canSelect =
    (boardContainer.isPlayerTurn && !props.isOpponent) ||
    (!boardContainer.isPlayerTurn && props.isOpponent);

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
          const earningPoints = boardContainer.board.calculateEarningPoints(
            card,
            Array.from(boardContainer.selectedOfferingCards)
          );
          return (
            <div
              key={`kitsune-card-in-play-${index}-` + card.imageSrc}
              className={
                boardContainer.isSelectingKitsuneCardToReplace && canSelect
                  ? "cursor-pointer"
                  : (boardContainer.highlightedKitsuneCards.has(card)
                      ? "cursor-pointer transition-all duration-300"
                      : "cursor-not-allowed") + " relative"
              }
              onClick={() => {
                if (
                  canSelect &&
                  boardContainer.isSelectingKitsuneCardToReplace &&
                  boardContainer.selectedKitsuneCardToActivate
                ) {
                  boardContainer.placeAndActivateKitsuneCard(
                    boardContainer.selectedKitsuneCardToActivate,
                    card
                  );
                } else if (boardContainer.highlightedKitsuneCards.has(card)) {
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
                  earningPoints > 0 && canSelect ? earningPoints : undefined
                }
                isInPlay={true}
                showReplaceHint={
                  canSelect && boardContainer.isSelectingKitsuneCardToReplace
                }
              ></KitsuneCardComponent>
            </div>
          );
        })}
        {
          /*!props.isOpponent &&*/
          new Array(Math.max(0, NumOfKitsuneCardsInPlay - cards.length))
            .fill(null)
            .map((val: any, index: number) => {
              return (
                <div
                  key={`empty-slot-${index}`}
                  className={`border-4 border-dashed border-white text-white relative`}
                  style={{
                    width: gameContainer.zoom * KitsuneCardWidth,
                    height: (221 / 137) * gameContainer.zoom * KitsuneCardWidth,
                  }}
                >
                  <div
                    className="absolute bottom-0 right-2"
                    style={{
                      fontSize: gameContainer.zoom * 16,
                    }}
                  >
                    Activated<br></br>Kitsune
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
}
