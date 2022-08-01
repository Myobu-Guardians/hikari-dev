import React from "react";
import { useTranslation } from "react-i18next";
import { GameContainer } from "../containers/game";
import PrivateMatchModal from "./PrivateMatchModal";

export default function GameMatches() {
  const { t } = useTranslation();
  const gameContainer = GameContainer.useContainer();

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

      <PrivateMatchModal></PrivateMatchModal>
    </div>
  ) : null;
}
