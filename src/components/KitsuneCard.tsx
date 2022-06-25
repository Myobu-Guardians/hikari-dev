import React, { useMemo } from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardHeight,
  KitsuneCardNumberWidth,
  KitsuneCardSymbolSize,
  KitsuneCardWidth,
} from "../lib/constants";
import {
  getKitsuneCardBorderImageSrc,
  getKitsuneCardImageSrc,
  KitsuneCard,
} from "../lib/kitsune";
import {
  getNumberImageSrcFromNumber,
  getSymbolImageSrcFromSymbol,
} from "../lib/offering";
import { intersperse } from "../lib/utils";

interface Props {
  kitsuneCard: KitsuneCard;
  earningPoints?: number;
  isInPlay?: boolean; // true => in play, false => in hand
  showHint?: string;
  showCastSpell?: boolean;
  isOpponent?: boolean;
}

function SpellTrigger(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const spellDescription = props.kitsuneCard.spell?.description || "";
  const spellTrigger = props.kitsuneCard.spell?.trigger || [];

  const plus = useMemo(
    () => (
      <div
        className="font-bold text-white"
        style={{
          fontSize: gameContainer.zoom * 12,
        }}
        key={"plus"}
      >
        {"+"}
      </div>
    ),
    [gameContainer.zoom]
  );

  const slash = useMemo(
    () => (
      <div
        className="font-bold text-white"
        style={{
          fontSize: gameContainer.zoom * 12,
        }}
        key="slash"
      >
        {"/"}
      </div>
    ),
    [gameContainer.zoom]
  );

  return (
    <div className="flex flex-col items-center absolute top-2 w-full">
      <div className="flex flex-row items-center justify-center">
        {intersperse(
          spellTrigger.map((spells, index) => {
            return (
              <div
                className="flex flex-row items-center justify-center"
                key={`spells-${props.kitsuneCard.id}-${index}`}
              >
                {intersperse(
                  spells.map((spell, index2) => {
                    return (
                      <div
                        className="flex flex-row items-center justify-center"
                        key={`spells-${props.kitsuneCard.id}-${index}-${index2}`}
                      >
                        <img
                          src={getSymbolImageSrcFromSymbol(spell)}
                          alt={spell}
                          width={
                            gameContainer.zoom * KitsuneCardSymbolSize * 0.7
                          }
                          height={
                            gameContainer.zoom * KitsuneCardSymbolSize * 0.7
                          }
                          className={"mx-0.5"}
                        />
                      </div>
                    );
                  }),
                  plus
                )}
              </div>
            );
          }),
          slash
        )}
      </div>
      <div
        className="font-bold text-white"
        style={{
          fontSize: gameContainer.zoom * 8,
          padding: `${gameContainer.zoom * 2}px ${gameContainer.zoom * 10}px`,
        }}
      >
        {spellDescription}
      </div>
      {props.showCastSpell && (
        <div
          className={
            "w-full text-white transition-all text-center py-2 " +
            ((boardContainer.isPlayerTurn && !props.isOpponent) ||
            (!boardContainer.isPlayerTurn &&
              props.isOpponent &&
              boardContainer.board.gameMode === "local")
              ? "cursor-pointer"
              : "cursor-not-allowed") +
            " " +
            (!props.isOpponent
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-blue-500")
          }
          style={{ fontSize: gameContainer.zoom * 12 }}
          onClick={() => {
            if (
              (boardContainer.isPlayerTurn && !props.isOpponent) ||
              (!boardContainer.isPlayerTurn &&
                props.isOpponent &&
                boardContainer.board.gameMode === "local")
            ) {
              boardContainer.castSpell(props.kitsuneCard);
            }
          }}
        >
          Cast Spell
        </div>
      )}
    </div>
  );
}
export default function KitsuneCardComponent(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const deltaHeight = props.earningPoints && props.earningPoints > 0 ? 12 : 0;
  return (
    <div
      className={
        "card shadow-black hover:shadow-lg hover:shadow-black hover:z-50 transform transition duration-300 rounded-sm glass shadow-md backdrop-blur-sm"
      }
      style={{ width: gameContainer.zoom * KitsuneCardWidth }}
    >
      <img
        src={getKitsuneCardBorderImageSrc(props.kitsuneCard)}
        alt={"Border"}
        className={"absolute"}
      ></img>
      <img
        src={getKitsuneCardImageSrc(props.kitsuneCard)}
        alt={props.kitsuneCard.id}
        style={{
          width: gameContainer.zoom * KitsuneCardWidth,
          height: gameContainer.zoom * KitsuneCardHeight,
        }}
      ></img>
      {/* Card number */}
      <img
        src={getNumberImageSrcFromNumber(props.kitsuneCard.number)}
        alt={props.kitsuneCard.number.toString()}
        className={"absolute"}
        style={{
          width: gameContainer.zoom * KitsuneCardNumberWidth,
          bottom: gameContainer.zoom * (4 + deltaHeight),
          left: gameContainer.zoom * 8,
        }}
      ></img>
      {/* Card symbol */}
      {props.kitsuneCard.symbols.length && (
        <div
          className={"absolute "}
          style={{
            bottom: props.isInPlay
              ? gameContainer.zoom * (12 + deltaHeight)
              : gameContainer.zoom * (36 + deltaHeight),
            right: props.isInPlay ? gameContainer.zoom * 8 : "auto",
            left: props.isInPlay ? "auto" : gameContainer.zoom * 8,
          }}
        >
          {props.kitsuneCard.symbols.map((symbol, index) => {
            return (
              <img
                src={getSymbolImageSrcFromSymbol(symbol)}
                alt={symbol}
                key={`${props.kitsuneCard.id}-symbol-${index}`}
                style={{
                  width: gameContainer.zoom * KitsuneCardSymbolSize,
                  height: gameContainer.zoom * KitsuneCardSymbolSize,
                }}
              ></img>
            );
          })}
        </div>
      )}
      <SpellTrigger
        kitsuneCard={props.kitsuneCard}
        showCastSpell={props.showCastSpell}
        isOpponent={props.isOpponent}
      ></SpellTrigger>
      {props.earningPoints && props.earningPoints > 0 ? (
        <div
          className={
            "w-full text-center absolute bottom-0 z-200 text-white " +
            (!props.isOpponent ? "bg-orange-500" : "bg-blue-500")
          }
          style={{ fontSize: gameContainer.zoom * 12 }}
        >
          {`+ ${props.earningPoints} ${
            props.earningPoints === 1 ? "point" : "points"
          }`}
        </div>
      ) : null}
      {props.showHint ? (
        <div
          className={
            "absolute bottom-0 text-white w-full text-center " +
            (!props.isOpponent ? "bg-orange-500" : "bg-blue-500")
          }
          style={{
            fontSize: gameContainer.zoom * 12,
          }}
        >
          {props.showHint}
        </div>
      ) : null}
    </div>
  );
}
