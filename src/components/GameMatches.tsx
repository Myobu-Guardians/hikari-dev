import React from "react";
import { useTranslation } from "react-i18next";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import PrivateMatchModal from "./PrivateMatchModal";
import SendMessageInput from "./SendMessageInput";

export default function GameMatches() {
  const { t } = useTranslation();
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();

  return gameContainer.playerProfile ? (
    <div
      className="absolute flex flex-col"
      style={{
        right: gameContainer.zoom * 4,
        bottom: gameContainer.zoom * 24,
      }}
    >
      <label
        className="btn btn-primary font-sans mb-2"
        style={{
          fontSize: gameContainer.zoom * 10,
          width: gameContainer.zoom * 110,
          height: gameContainer.zoom * 24,
        }}
        htmlFor="private-match-modal"
      >
        {t("Private Match")}
      </label>
      {boardContainer.board?.gameMode === "local" ? (
        <button
          className="btn btn-secondary font-sans text-white"
          disabled={true}
          style={{
            fontSize: gameContainer.zoom * 10,
            width: gameContainer.zoom * 110,
            height: gameContainer.zoom * 24,
            color: "#fff",
          }}
        >
          {t("Public Match")}
          <span
            className="text-red-400"
            style={{
              fontSize: gameContainer.zoom * 8,
            }}
          >
            {" (" + t("Comming Soon") + ")"}
          </span>
        </button>
      ) : (
        <SendMessageInput
          style={{
            fontSize: gameContainer.zoom * 12,
            width: gameContainer.zoom * 110,
            height: gameContainer.zoom * 24,
            // bottom: gameContainer.zoom * 36,
            // borderWidth: gameContainer.zoom * 2,
          }}
          // className={"absolute right-2"}
        ></SendMessageInput>
      )}
      <PrivateMatchModal></PrivateMatchModal>
    </div>
  ) : null;
}
