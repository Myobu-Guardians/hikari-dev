import React from "react";
import { BoardContainer } from "../containers/board";
import { GameContainer } from "../containers/game";
import { copyToClipboard } from "../lib/utils";
import CardsModal from "./CardsModal";
import HelpModal from "./HelpModal";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import SettingsModal from "./SettingsModal";

export default function Menu() {
  const gameContainer = GameContainer.useContainer();
  const boardContainer = BoardContainer.useContainer();
  const { t } = useTranslation();

  return (
    <>
      <div
        className="dropdown dropdown-end absolute font-sans"
        style={{
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 4,
        }}
      >
        <label
          tabIndex={0}
          className="btn btn-sm m-1 "
          style={{
            width: gameContainer.zoom * 60,
            height: gameContainer.zoom * 32,
            fontSize: gameContainer.zoom * 10,
          }}
        >
          {t("Menu")}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-0 shadow bg-black text-white rounded-box w-48"
          style={{
            fontSize: gameContainer.zoom * 10,
          }}
        >
          <li>
            <label htmlFor="help-modal">{t("Game rules")}</label>
          </li>
          <li>
            <label htmlFor="cards-modal">{t("Card library")}</label>
          </li>
          <li>
            <label htmlFor="settings-modal">{t("Settings")}</label>
          </li>
        </ul>
      </div>
      <HelpModal></HelpModal>
      <CardsModal></CardsModal>
      <SettingsModal></SettingsModal>
    </>
  );
}
