import React from "react";
import { GameContainer } from "../containers/game";
import { OfferingCardSize } from "../lib/constants";
import { OfferingCard } from "../lib/offering";

interface Props {
  offeringCard: OfferingCard;
}
export default function OfferingCardComponent(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div className="card shadow-black hover:shadow-lg hover:shadow-black hover:scale-110 transform transition duration-300 rounded-sm m-2 glass shadow-md cursor-pointer">
      <img
        src={props.offeringCard.imageSrc}
        alt={props.offeringCard.id}
        style={{
          width: gameContainer.zoom * OfferingCardSize,
          height: gameContainer.zoom * OfferingCardSize,
        }}
      ></img>
    </div>
  );
}
