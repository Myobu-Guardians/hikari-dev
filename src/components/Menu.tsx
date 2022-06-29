import React from "react";
import { GameContainer } from "../containers/game";
import CardsModal from "./CardsModal";
import HelpModal from "./HelpModal";

export default function Menu() {
  const gameContainer = GameContainer.useContainer();

  return (
    <>
      <div
        className="dropdown dropdown-end absolute"
        style={{
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 16,
          fontSize: gameContainer.zoom * 14,
        }}
      >
        <label tabIndex={0} className="btn btn-sm m-1">
          Menu
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-0 shadow bg-black text-white rounded-box w-48"
          style={{
            fontSize: gameContainer.zoom * 10,
          }}
        >
          <li>
            <label htmlFor="help-modal">Game rules</label>
          </li>
          <li>
            <label htmlFor="cards-modal">Card library</label>
          </li>
        </ul>
      </div>
      <HelpModal></HelpModal>
      <CardsModal></CardsModal>
    </>
  );
}
