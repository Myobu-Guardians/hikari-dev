import React, { useState } from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  BoardWidth,
  KitsuneCardHeight,
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
import { canCastSpell } from "../lib/spellFn";
import KitsuneCardComponent from "./KitsuneCard";
import KitsuneCardBack from "../assets/images/kitsunes/back.jpg";
import KitsuneBackground from "../assets/images/kitsunes/background.png";
import { useTranslation } from "react-i18next";

interface Props {
  isOpponent?: boolean;
  /**
   * Hide the kitsune cards in play for `hideKitsuneCards` turns
   */
  hideKitsuneCards: number;
}
export default function KitsuneCardsInPlay(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const { t } = useTranslation();
  const [mouseOverCard, setMouseOverCard] = useState<KitsuneCard | null>(null);

  const cards: KitsuneCard[] =
    (props.isOpponent
      ? boardContainer.board.opponent?.kitsuneCardsInPlay
      : boardContainer.board.player?.kitsuneCardsInPlay) || [];

  const canSelect = boardContainer.isPlayerTurn && !props.isOpponent; /* ||
    (!boardContainer.isPlayerTurn &&
      props.isOpponent &&
      boardContainer.board.gameMode === "local");*/

  const actor = props.isOpponent
    ? boardContainer.board.opponent
    : boardContainer.board.player;

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
      <div className="w-full flex flex-row items-center justify-evenly relative">
        {cards.map((card, index, self) => {
          if (
            props.hideKitsuneCards > 0 &&
            props.isOpponent /* &&
            boardContainer.board.gameMode !== "local" */
          ) {
            return (
              <div key={`kitsune-card-in-play-${index}-` + card.id}>
                <img
                  src={KitsuneCardBack}
                  alt={"Kitsune cards in deck"}
                  style={{
                    width: gameContainer.zoom * KitsuneCardWidth,
                    height: gameContainer.zoom * KitsuneCardHeight,
                  }}
                ></img>
              </div>
            );
          }

          const earningPoints = boardContainer.board.calculateEarningPoints(
            card,
            Array.from(boardContainer.selectedOfferingCards)
          );
          const canCastSpell_ = canCastSpell(
            card,
            Array.from(boardContainer.selectedOfferingCards)
          );
          return (
            <div
              key={`kitsune-card-in-play-${index}-` + card.id}
              className={
                "transition-all " +
                (boardContainer.isSelectingKitsuneCardToCastSpellAt
                  ? "cursor-pointer"
                  : boardContainer.isSelectingKitsuneCardToReplace && canSelect
                  ? "cursor-pointer"
                  : boardContainer.isSelectingKitsuneCardToCastSpell &&
                    boardContainer.castingPassiveSpellOfKitsuneCard?.id !==
                      card.id &&
                    canSelect
                  ? "cursor-pointer"
                  : (boardContainer.highlightedKitsuneCards.has(card)
                      ? "cursor-pointer transition-all duration-300"
                      : "cursor-not-allowed") + " relative")
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
                } else if (
                  canSelect &&
                  boardContainer.highlightedKitsuneCards.has(card) &&
                  !boardContainer.isSelectingKitsuneCardToCastSpell &&
                  !boardContainer.isSelectingKitsuneCardToCastSpellAt
                ) {
                  boardContainer.placeAndActivateKitsuneCard(card);
                } else if (boardContainer.isSelectingKitsuneCardToCastSpellAt) {
                  boardContainer.castSpellAtKitsuneCard(card);
                } else if (
                  canSelect &&
                  boardContainer.isSelectingKitsuneCardToCastSpell
                ) {
                  boardContainer.castSpellUsingKitsuneCard(card);
                }
              }}
              onMouseEnter={() => {
                setMouseOverCard(card);
              }}
              onMouseLeave={() => {
                setMouseOverCard(null);
              }}
              style={{
                transform:
                  mouseOverCard === card
                    ? `translateY(${
                        props.isOpponent
                          ? gameContainer.zoom * 35
                          : gameContainer.zoom * -20
                      }px) scale(150%)`
                    : ``,
                zIndex: mouseOverCard === card ? 100 : 0,
              }}
            >
              <KitsuneCardComponent
                kitsuneCard={card}
                earningPoints={
                  /* canSelect && */
                  !boardContainer.isSelectingKitsuneCardToReplace &&
                  !boardContainer.isSelectingKitsuneCardToCastSpellAt &&
                  !boardContainer.isSelectingKitsuneCardToCastSpell &&
                  earningPoints > 0
                    ? earningPoints
                    : undefined
                }
                isInPlay={true}
                showHint={
                  /* canSelect && */ boardContainer.isSelectingKitsuneCardToReplace
                    ? t("card/replace-this-card")
                    : boardContainer.isModifyingSymbolOfKitsuneCard === card
                    ? t("card/modify-symbol")
                    : boardContainer.isSelectingKitsuneCardToCastSpellAt
                    ? t("card/target-this-card")
                    : /* canSelect && */
                    boardContainer.isSelectingKitsuneCardToCastSpell &&
                      card.spell &&
                      card.spell.trigger.length > 0
                    ? t("card/cast-spell")
                    : ""
                }
                showCastSpell={
                  /* canSelect && */
                  !boardContainer.isSelectingKitsuneCardToReplace &&
                  !boardContainer.isSelectingKitsuneCardToCastSpellAt &&
                  !boardContainer.isSelectingKitsuneCardToCastSpell &&
                  canCastSpell_
                }
                isOpponent={props.isOpponent}
                displayBorderColor={
                  !!(
                    boardContainer.castingPassiveSpellOfKitsuneCard &&
                    card.id ===
                      boardContainer.castingPassiveSpellOfKitsuneCard.id
                  ) && !boardContainer.isSelectingKitsuneCardToCastSpellAt
                }
                showAnimation={mouseOverCard === card}
                locked={card.locked}
              ></KitsuneCardComponent>
              {actor &&
                actor.extraKitsuneCardsInPlay > 0 &&
                index === self.length - 1 && (
                  <div
                    className="absolute w-full bottom-1/2 left-0 text-white p-2"
                    style={{
                      fontSize: gameContainer.zoom * 10,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                  >{`Available for ${actor.extraKitsuneCardsInPlay} turns`}</div>
                )}
            </div>
          );
        })}
        {
          /*!props.isOpponent &&*/
          new Array(
            Math.max(
              0,
              NumOfKitsuneCardsInPlay +
                (actor && actor.extraKitsuneCardsInPlay > 0 ? 1 : 0) -
                cards.length
            )
          )
            .fill(null)
            .map((val: any, index: number, self) => {
              return (
                <div
                  key={`empty-slot-${index}`}
                  className={`text-white border-dashed relative backdrop-grayscale-0`}
                  style={{
                    width: gameContainer.zoom * KitsuneCardWidth,
                    height: (221 / 137) * gameContainer.zoom * KitsuneCardWidth,
                    backgroundImage: `url(${KitsuneBackground})`,
                    backgroundSize: `cover`,
                    filter: `grayscale(90%)`,
                    borderWidth: gameContainer.zoom * 2,
                  }}
                >
                  <div
                    className={"top-1 right-1 absolute"}
                    style={{
                      fontSize: gameContainer.zoom * 12,
                    }}
                  >
                    {t("board/empty-shrine")}
                  </div>
                  {actor &&
                    actor.extraKitsuneCardsInPlay > 0 &&
                    index === self.length - 1 && (
                      <div
                        className="absolute w-full bottom-1/2 left-0 text-white p-2"
                        style={{
                          fontSize: gameContainer.zoom * 10,
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        }}
                      >{`Available for ${actor.extraKitsuneCardsInPlay} turns`}</div>
                    )}
                </div>
              );
            })
        }
        {props.hideKitsuneCards > 0 && (
          <div
            className="text-white p-4 absolute text-center flex flex-row items-center justify-center"
            style={{
              fontSize: gameContainer.zoom * 18,
              width: (gameContainer.zoom * BoardWidth) / 4,
              height: gameContainer.zoom * 80,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
          >
            <div>
              {t("card/hide-for-turns", { turns: props.hideKitsuneCards })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
