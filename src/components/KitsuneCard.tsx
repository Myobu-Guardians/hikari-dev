import React from "react";
import { GameContainer } from "../containers/game";
import { KitsuneCardHeight, KitsuneCardWidth } from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";

interface Props {
  kitsuneCard: KitsuneCard;
}
export default function KitsuneCardComponent(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="card shadow-black hover:shadow-lg hover:shadow-black hover:scale-125 hover:z-50 transform transition duration-300 rounded-sm m-2 glass shadow-md cursor-pointer"
      style={{ width: gameContainer.zoom * KitsuneCardWidth }}
    >
      <img
        src={props.kitsuneCard.imageSrc}
        alt={props.kitsuneCard.id}
        style={{
          width: gameContainer.zoom * KitsuneCardWidth,
          height: gameContainer.zoom * KitsuneCardHeight,
        }}
      ></img>
    </div>
  );
}
