/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { GameContainer } from "../containers/game";
import {
  BoardGamePointsLeft,
  BoardGamePointsTop,
  BoardHeight,
  BoardWidth,
  WinPoints,
} from "../lib/constants";
import HikariBoard from "../assets/images/Hikari Playing Board with Items.png";
import OfferingCardsInDeck from "./OfferingCardsInDeck";
import OfferingCardsInPlay from "./OfferingCardsInPlay";
import UsedOfferingCards from "./UsedOfferingCards";
import KitsuneCardsInDeck from "./KitsuneCardsInDeck";
import KitsuneCardsInPlay from "./KitsuneCardsInPlay";
import KitsuneCardsInHand from "./KitsuneCardsInHand";
import { BoardContainer } from "../containers/board";

export function HelpModal() {
  return (
    <div>
      <label
        htmlFor="help-modal"
        className="btn btn-primary btn-sm modal-button fixed top-0 right-0 z-50"
      >
        Help ?
      </label>
      <input type="checkbox" id="help-modal" className="modal-toggle" />
      <div className="modal font-sans">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Game rules</h3>
          <p className="py-4">
            What you can do on your turn (only one action per turn):
          </p>
          <ul>
            <li>* Draw a Kitsune card</li>
            <li>* Place and activate Kitsune card</li>
            <li>* Activate Kitsune card</li>
            <li>* Cast Kitsune spell</li>
            <li>* Remove any Offering</li>
          </ul>
          <p className="py-4">
            You can plase a Kitsune card on empty space OR replace with an
            already placed Kitsune card (that then goes into your hand).
          </p>
          <p>{`First player that scores ${WinPoints} points wins.`}</p>
          <div className="modal-action">
            <label htmlFor="help-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function GamePoints() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  return (
    <div
      className="absolute z-50 font-bold text-center text-gray-900"
      style={{
        left: gameContainer.zoom * BoardGamePointsLeft,
        top: gameContainer.zoom * BoardGamePointsTop,
        fontSize: gameContainer.zoom * 36,
        lineHeight: "100%",
      }}
    >
      <div
        className={
          "transition-all duration-300 " +
          (!boardContainer.isPlayerTurn ? "text-orange-400" : "")
        }
        style={{
          fontSize:
            gameContainer.zoom * (!boardContainer.isPlayerTurn ? 48 : 36),
        }}
      >
        {boardContainer.board.opponent?.gamePoints || "0"}
      </div>
      <div className="text-gray-800">-</div>
      <div
        className={
          "transition-all duration-300 " +
          (boardContainer.isPlayerTurn ? "text-orange-400" : "")
        }
        style={{
          fontSize:
            gameContainer.zoom * (boardContainer.isPlayerTurn ? 48 : 36),
        }}
      >
        {boardContainer.board.player?.gamePoints || "0"}
      </div>
    </div>
  );
}

export default function Board() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  return (
    <div className="container mx-auto px-4">
      <HelpModal />

      <div
        className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`}
        style={{
          width: `${BoardWidth * gameContainer.zoom}px`,
          height: `${BoardHeight * gameContainer.zoom}px`,
        }}
      >
        <GamePoints />

        <img
          src={HikariBoard}
          style={{
            width: `${BoardWidth * gameContainer.zoom}px`,
            height: `${BoardHeight * gameContainer.zoom}px`,
          }}
        ></img>

        {/* Offering cards */}
        <OfferingCardsInDeck></OfferingCardsInDeck>
        <OfferingCardsInPlay></OfferingCardsInPlay>
        <UsedOfferingCards></UsedOfferingCards>

        {/* Player  */}
        {boardContainer.board.player && (
          <>
            <KitsuneCardsInDeck isOpponent={false}></KitsuneCardsInDeck>
            <KitsuneCardsInPlay isOpponent={false}></KitsuneCardsInPlay>
            <KitsuneCardsInHand isOpponent={false}></KitsuneCardsInHand>
          </>
        )}
        {/* Opponent */}
        {boardContainer.board.opponent && (
          <>
            <KitsuneCardsInDeck isOpponent={true}></KitsuneCardsInDeck>
            <KitsuneCardsInPlay isOpponent={true}></KitsuneCardsInPlay>
            <KitsuneCardsInHand
              isOpponent={true}
              showOpponentsCards={true}
            ></KitsuneCardsInHand>
          </>
        )}
      </div>
    </div>
  );
}
