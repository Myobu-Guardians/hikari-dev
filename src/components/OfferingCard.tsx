import React from "react";
import { GameContainer } from "../containers/game";
import { OfferingCardSize } from "../lib/constants";
import { getOfferingCardImageSrc, OfferingCard } from "../lib/offering";

interface Props {
  offeringCard: OfferingCard;
}
export default function OfferingCardComponent(props: Props) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div className="card shadow-black hover:shadow-lg hover:shadow-black rounded-sm glass shadow-md cursor-pointer">
      <img
        src={getOfferingCardImageSrc(props.offeringCard)}
        alt={props.offeringCard.id}
        style={{
          width: gameContainer.zoom * OfferingCardSize,
          height: gameContainer.zoom * OfferingCardSize,
        }}
      ></img>
    </div>
  );
}
