/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
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
import { copyToClipboard } from "../lib/utils";
import { getSymbolImageSrcFromSymbol, OfferingSymbol } from "../lib/offering";
import { gitCommit } from "../git_commit";

interface ModifySymbolProps {}
function ModifySymbol(props: ModifySymbolProps) {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const isAddingSymbol =
    boardContainer.castingSpellsOfKitsuneCards[0].spell?.id ===
    "tail-4-light-spell";

  return (
    <div>
      <div
        className="text-white p-4 fixed text-center flex flex-row items-center justify-between"
        style={{
          fontSize: gameContainer.zoom * 18,
          width: (gameContainer.zoom * BoardWidth) / 2,
          height: gameContainer.zoom * 80,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          left: gameContainer.zoom * 250,
          top: gameContainer.zoom * (BoardHeight / 2 - 40),
        }}
      >
        <div className="flex flex-row items-center">
          <div>{isAddingSymbol ? "Add a symbol" : "Remove a symbol"}</div>
          <div className="flex flex-row items-center ml-2">
            {[
              OfferingSymbol.Beverage,
              OfferingSymbol.Food,
              OfferingSymbol.Incense,
              OfferingSymbol.MusicInstrument,
              OfferingSymbol.Plant,
              OfferingSymbol.Treasure,
            ]
              .filter((symbol) => {
                const flag =
                  boardContainer.isModifyingSymbolOfKitsuneCard?.symbols.includes(
                    symbol
                  );
                if (isAddingSymbol) {
                  return !flag;
                } else {
                  return flag;
                }
              })
              .map((symbol) => {
                return (
                  <img
                    key={`symbol-to-remove-${symbol}`}
                    src={getSymbolImageSrcFromSymbol(symbol)}
                    className={"cursor-pointer mx-1 hover:scale-125"}
                    style={{
                      width: gameContainer.zoom * 24,
                      height: gameContainer.zoom * 24,
                    }}
                    onClick={() => {
                      boardContainer.modifySymbolOfKitsuneCard(symbol);
                    }}
                  ></img>
                );
              })}
          </div>
        </div>

        <button
          className="btn btn-sm btn-primary ml-2 "
          onClick={() => {
            boardContainer.cancelCastingSpell();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function HelpModal() {
  const gameContainer = GameContainer.useContainer();
  return (
    <div>
      <label
        htmlFor="help-modal"
        className="btn btn-primary btn-sm modal-button absolute z-50"
        style={{
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 16,
          fontSize: gameContainer.zoom * 12,
        }}
      >
        Help ?
      </label>
      <input type="checkbox" id="help-modal" className="modal-toggle" />
      <div className="modal font-sans">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Game rules</h3>
          <p className="text-sm mt-4">
            Code version:{" "}
            <strong className="text-blue-400">
              <a
                href={`https://github.com/Myobu-Guardians/hikari-dev/commit/${gitCommit.hash}`}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {gitCommit.logMessage}
              </a>
            </strong>
          </p>
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
          (!boardContainer.isPlayerTurn ? "text-blue-400" : "")
        }
        style={{
          fontSize:
            gameContainer.zoom * (!boardContainer.isPlayerTurn ? 64 : 36),
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
            gameContainer.zoom * (boardContainer.isPlayerTurn ? 64 : 36),
        }}
      >
        {boardContainer.board.player?.gamePoints || "0"}
      </div>
    </div>
  );
}

export default function Board() {
  const [message, setMessage] = useState<string>("");
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  return (
    <div className="container mx-auto px-4">
      <div
        className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`}
        style={{
          width: `${BoardWidth * gameContainer.zoom}px`,
          height: `${BoardHeight * gameContainer.zoom}px`,
        }}
      >
        <HelpModal />
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
            <div
              className="absolute bottom-2 right-4 text-white cursor-pointer"
              onClick={() => {
                const url = new URL(window.location.href);
                url.search = `?peerId=${boardContainer.playerId}`;
                copyToClipboard(url.toString());
              }}
              style={{ fontSize: gameContainer.zoom * 12 }}
            >
              {boardContainer.playerId
                ? `Your Id: ${boardContainer.playerId}`
                : "Connecting to Myobu Metaverse"}
            </div>
            {boardContainer.playerId &&
              boardContainer.board.gameMode === "remote" && (
                <div>
                  <input
                    type="text"
                    className="input absolute right-2 input-bordered input-ghost border-orange-500 text-white"
                    style={{
                      fontSize: gameContainer.zoom * 12,
                      width: gameContainer.zoom * 128,
                      height: gameContainer.zoom * 36,
                      bottom: gameContainer.zoom * 36,
                      borderWidth: gameContainer.zoom * 2,
                    }}
                    placeholder="Send message"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.which === 13 && message.length) {
                        // Pressed enter key
                        boardContainer.sendMessage(message);
                        setMessage("");
                      }
                    }}
                  ></input>
                </div>
              )}
          </>
        )}
        {/* Opponent */}
        {boardContainer.board.opponent && (
          <>
            <KitsuneCardsInDeck isOpponent={true}></KitsuneCardsInDeck>
            <KitsuneCardsInPlay isOpponent={true}></KitsuneCardsInPlay>
            <KitsuneCardsInHand
              isOpponent={true}
              showOpponentsCards={boardContainer.board.gameMode === "local"}
            ></KitsuneCardsInHand>
            <div
              className="absolute top-12 right-4 text-white"
              style={{ fontSize: gameContainer.zoom * 12 }}
            >
              {boardContainer.opponentId
                ? `Playing against: ${boardContainer.opponentId}`
                : "Local game"}
            </div>
          </>
        )}
        {/* Activate a kitsune card and replace one in play */}
        {boardContainer.isSelectingKitsuneCardToReplace && (
          <div>
            <div
              className="text-white p-4 fixed text-center flex flex-row items-center"
              style={{
                fontSize: gameContainer.zoom * 18,
                width: (gameContainer.zoom * BoardWidth) / 2,
                height: gameContainer.zoom * 80,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                left: gameContainer.zoom * 250,
                top: gameContainer.zoom * (BoardHeight / 2 - 40),
              }}
            >
              Please select the Kitsune card to replace with
              <button
                className="btn btn-sm btn-primary ml-2"
                onClick={() => {
                  boardContainer.setIsSelectingKitsuneCardToReplace(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Casting spell, selecting target Kitsune card */}
        {boardContainer.isSelectingKitsuneCardToCastSpellAt &&
          !boardContainer.isModifyingSymbolOfKitsuneCard &&
          boardContainer.castingSpellsOfKitsuneCards.length > 0 && (
            <div>
              <div
                className="text-white p-4 fixed text-center flex flex-row items-center"
                style={{
                  fontSize: gameContainer.zoom * 18,
                  width: (gameContainer.zoom * BoardWidth) / 2,
                  height: gameContainer.zoom * 80,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  left: gameContainer.zoom * 250,
                  top: gameContainer.zoom * (BoardHeight / 2 - 40),
                }}
              >
                {
                  boardContainer.castingSpellsOfKitsuneCards[0].spell
                    ?.description
                }
                <button
                  className="btn btn-sm btn-primary ml-2"
                  onClick={() => {
                    boardContainer.cancelCastingSpell();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        {/* Select a kitsune card to cast spell */}
        {boardContainer.isSelectingKitsuneCardToCastSpell &&
          !boardContainer.isModifyingSymbolOfKitsuneCard && (
            <div>
              <div
                className="text-white p-4 fixed text-center flex flex-row items-center"
                style={{
                  fontSize: gameContainer.zoom * 18,
                  width: (gameContainer.zoom * BoardWidth) / 2,
                  height: gameContainer.zoom * 80,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  left: gameContainer.zoom * 250,
                  top: gameContainer.zoom * (BoardHeight / 2 - 40),
                }}
              >
                {`Please select a kitunse card to cast spell`}
                <button
                  className="btn btn-sm btn-primary ml-2"
                  onClick={() => {
                    boardContainer.cancelCastingSpell();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        {/* Display symbols to edit */}
        {boardContainer.isModifyingSymbolOfKitsuneCard &&
          boardContainer.castingSpellsOfKitsuneCards.length > 0 &&
          (boardContainer.castingSpellsOfKitsuneCards[0].spell?.id ===
            "tail-4-light-spell" ||
            boardContainer.castingSpellsOfKitsuneCards[0].spell?.id ===
              "tail-4-dark-spell") && <ModifySymbol></ModifySymbol>}
      </div>
    </div>
  );
}
