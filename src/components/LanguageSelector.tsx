import React from "react";
import { GameContainer } from "../containers/game";
import { SettingsContainer } from "../containers/settings";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function LanguageSelector(props: Props) {
  const gameContainer = GameContainer.useContainer();
  const settingsContainer = SettingsContainer.useContainer();

  return (
    <>
      <div
        className={
          "dropdown font-sans " + (props.className || "absolute dropdown-end")
        }
        style={
          props.style || {
            top: gameContainer.zoom * 4,
            right: gameContainer.zoom * 70,
          }
        }
      >
        <label
          tabIndex={0}
          className="btn btn-sm m-1"
          style={{
            width: gameContainer.zoom * 60,
            height: gameContainer.zoom * 32,
            fontSize: gameContainer.zoom * 10,
          }}
        >
          文/A
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-0 shadow bg-black text-white rounded-box w-48"
          style={{
            fontSize: gameContainer.zoom * 10,
          }}
        >
          <li>
            <label
              onClick={() => {
                settingsContainer.setLanguage("de-DE");
              }}
            >
              Deutsch
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                settingsContainer.setLanguage("en-US");
              }}
            >
              English
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                settingsContainer.setLanguage("es-ES");
              }}
            >
              Español
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                settingsContainer.setLanguage("zh-CN");
              }}
            >
              简体中文
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                settingsContainer.setLanguage("ja-JP");
              }}
            >
              日本語
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}
