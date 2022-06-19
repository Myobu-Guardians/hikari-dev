import React from "react";
import { GameContainer } from "../containers/game";
import {
  KitsuneCardHeight,
  KitsuneCardNumberWidth,
  KitsuneCardSymbolSize,
  KitsuneCardWidth,
} from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import {
  getNumberImageSrcFromNumber,
  getSymbolImageSrcFromSymbol,
} from "../lib/offering";
import { intersperse } from "../lib/utils";

interface Props {
  kitsuneCard: KitsuneCard;
}

function SpellTrigger(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const spell = props.kitsuneCard.spell;
  const spellTrigger = props.kitsuneCard.spellTrigger;
  return (
    <div className="flex flex-col items-center absolute top-2 w-full">
      <div className="flex flex-row items-center justify-center">
        {intersperse(
          spellTrigger.map((spells) => {
            return (
              <div className="flex flex-row items-center justify-center">
                {intersperse(
                  spells.map((spell) => {
                    return (
                      <div className="flex flex-row items-center justify-center">
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
                  <div className="font-bold mx-0.5">{"+"}</div>
                )}
              </div>
            );
          }),
          <div className="font-bold mx-0.5">{"/"}</div>
        )}
      </div>
      <div className="font-bold" style={{ fontSize: gameContainer.zoom * 8 }}>
        {spell}
      </div>
    </div>
  );
}

export default function KitsuneCardComponent(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="card shadow-black hover:shadow-lg hover:shadow-black hover:scale-125 hover:z-50 transform transition duration-300 rounded-sm m-2 glass shadow-md cursor-pointer"
      style={{ width: gameContainer.zoom * KitsuneCardWidth }}
    >
      <img
        src={props.kitsuneCard.borderSrc}
        alt={"Border"}
        className={"absolute"}
      ></img>
      <img
        src={props.kitsuneCard.imageSrc}
        alt={props.kitsuneCard.id}
        style={{
          width: gameContainer.zoom * KitsuneCardWidth,
          height: gameContainer.zoom * KitsuneCardHeight,
        }}
      ></img>
      <img
        src={getNumberImageSrcFromNumber(props.kitsuneCard.number)}
        alt={props.kitsuneCard.number.toString()}
        className={"absolute left-2 bottom-1"}
        style={{
          width: gameContainer.zoom * KitsuneCardNumberWidth,
        }}
      ></img>
      <img
        src={getSymbolImageSrcFromSymbol(props.kitsuneCard.symbol)}
        alt={props.kitsuneCard.symbol}
        className={"absolute right-3 bottom-4"}
        style={{
          width: gameContainer.zoom * KitsuneCardSymbolSize,
          height: gameContainer.zoom * KitsuneCardSymbolSize,
        }}
      ></img>
      <SpellTrigger kitsuneCard={props.kitsuneCard}></SpellTrigger>
    </div>
  );
}
