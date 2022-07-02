import React from "react";
import { GameContainer } from "../containers/game";

export default function LanguageSelector() {
  const gameContainer = GameContainer.useContainer();
  return (
    <>
      <div
        className="dropdown dropdown-end absolute font-sans"
        style={{
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 70,
        }}
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
                gameContainer.setLanguage("de-DE");
              }}
            >
              Deutsch
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                gameContainer.setLanguage("en-US");
              }}
            >
              English
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                gameContainer.setLanguage("es-ES");
              }}
            >
              Español
            </label>
          </li>
          <li>
            <label
              onClick={() => {
                gameContainer.setLanguage("zh-CN");
              }}
            >
              简体中文
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}
