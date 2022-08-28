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
import { getSymbolImageSrcFromSymbol, OfferingSymbol } from "../lib/offering";
import Menu from "./Menu";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import ConnectToWallet from "./ConnectToWallet";
import GameMatches from "./GameMatches";

interface ModifySymbolProps {}
function ModifySymbol(props: ModifySymbolProps) {
  const { t } = useTranslation();
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
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
}

function GamePoints() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const { t } = useTranslation();

  const winner =
    boardContainer.board.player &&
    boardContainer.board.player.gamePoints >= WinPoints
      ? boardContainer.board.player
      : boardContainer.board.opponent &&
        boardContainer.board.opponent.gamePoints >= WinPoints
      ? boardContainer.board.opponent
      : null;

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
      {winner ? (
        <div className="fixed w-full h-full left-0 top-0 backdrop-blur-md">
          <div
            className="text-white absolute text-center flex flex-row items-center justify-center font-assasin p-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: gameContainer.zoom * 32,
              width: (gameContainer.zoom * BoardWidth) / 2,
              height: gameContainer.zoom * 80,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 999,
            }}
          >
            {winner === boardContainer.board.player
              ? t("board/you-wins")
              : t("board/you-loses")}
            <button
              className="btn btn-md btn-primary ml-5"
              onClick={() => {
                window.location.reload();
              }}
            >
              {t("Restart")}
            </button>
          </div>
        </div>
      ) : null}
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
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const { t } = useTranslation();
  (window as any)["boardContainer"] = boardContainer;

  return (
    <div className="container mx-auto px-4">
      <div
        className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`}
        style={{
          width: `${BoardWidth * gameContainer.zoom}px`,
          height: `${BoardHeight * gameContainer.zoom}px`,
        }}
      >
        {/* Connect to Wallet */}
        <ConnectToWallet></ConnectToWallet>

        {/* Languages */}
        <LanguageSelector></LanguageSelector>

        {/* Menu */}
        <Menu></Menu>

        {/* Game points */}
        <GamePoints />

        {/* Game Matches */}
        <GameMatches />

        {/* Board background */}
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
            <KitsuneCardsInPlay
              isOpponent={false}
              hideKitsuneCards={
                boardContainer.board.player.hideKitsuneCardsInPlay
              }
            ></KitsuneCardsInPlay>
            <KitsuneCardsInHand
              isOpponent={false}
              showKitsuneCards={
                boardContainer.board.player.showKitsuneCardsInHand
              }
            ></KitsuneCardsInHand>
            <div
              className="absolute bottom-2 right-4 text-white font-sans"
              style={{ fontSize: gameContainer.zoom * 12 }}
              title={gameContainer.signerAddress || ""}
            >
              {gameContainer.signerAddress
                ? gameContainer.signerAddress.slice(0, 12) + "..."
                : `${t("board/wallet-not-connected")}`}
            </div>
          </>
        )}
        {/* Opponent */}
        {boardContainer.board.opponent && (
          <>
            <KitsuneCardsInDeck isOpponent={true}></KitsuneCardsInDeck>
            <KitsuneCardsInPlay
              isOpponent={true}
              hideKitsuneCards={
                boardContainer.board.opponent.hideKitsuneCardsInPlay
              }
            ></KitsuneCardsInPlay>
            <KitsuneCardsInHand
              isOpponent={true}
              showKitsuneCards={
                boardContainer.board.opponent.showKitsuneCardsInHand
              }
            ></KitsuneCardsInHand>
            <div
              className="absolute text-white font-sans"
              style={{
                fontSize: gameContainer.zoom * 12,
                top: gameContainer.zoom * 50,
                right: gameContainer.zoom * 12,
              }}
            >
              {boardContainer.board.opponent.walletAddress
                ? `${t("board/playing-against")}: ` +
                  boardContainer.board.opponent.walletAddress.slice(0, 12) +
                  "..."
                : boardContainer.opponentId
                ? `${t("board/playing-against")}: ${t("board/remote-player")}`
                : t("board/local-game")}
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
              {t("board/select-kitsune-card-to-replace-with")}
              <button
                className="btn btn-sm btn-primary ml-2"
                onClick={() => {
                  boardContainer.setIsSelectingKitsuneCardToReplace(false);
                }}
              >
                {t("Cancel")}
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
                {t(
                  boardContainer.castingSpellsOfKitsuneCards[0].spell
                    ?.description || ""
                )}
                <button
                  className="btn btn-sm btn-primary ml-2"
                  onClick={() => {
                    boardContainer.cancelCastingSpell();
                  }}
                >
                  {t("Cancel")}
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
                {t("board/passive-spell-triggered")}
                {boardContainer.isPlayerTurn && (
                  <button
                    className="btn btn-sm btn-primary ml-2"
                    onClick={() => {
                      boardContainer.cancelCastingSpell();
                    }}
                  >
                    {t("Cancel")}
                  </button>
                )}
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
