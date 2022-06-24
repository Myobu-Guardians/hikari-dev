/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import { BoardContainer } from "./containers/board";
// @ts-ignore
import DeviceOrientation, { Orientation } from "react-screen-orientation";
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt";
import { GameContainer } from "./containers/game";
import { BoardHeight, BoardWidth } from "./lib/constants";
const is = require("is_js");
(window as any)["is"] = is;

function App() {
  const gameContainer = GameContainer.useContainer();

  useEffect(() => {
    const handler = (event: any) => {
      try {
        event.preventDefault();
        event.prompt();
        event.userChoice.then((choiceResult: any) => {
          console.log(choiceResult);
        });
      } catch (error) {
        console.error(error);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
  return (
    <DeviceOrientation
      lockOrientation={"landscape"}
      onOrientationChange={() => {
        gameContainer.resize();
      }}
    >
      {/* Will only be in DOM in landscape */}
      <Orientation orientation="landscape" alwaysRender={true}>
        <div className="container mx-auto px-4 select-none font-assasin">
          <BoardContainer.Provider>
            <Board></Board>
          </BoardContainer.Provider>
          <ServiceWorkerWrapper></ServiceWorkerWrapper>
          {is.safari() ? (
            <div className="z-50 font-sans text-black">
              <PWAPrompt></PWAPrompt>
            </div>
          ) : null}
        </div>
      </Orientation>
      {/* Will stay in DOM, but is only visible in portrait */}
      <Orientation orientation="portrait" alwaysRender={false}>
        <div className="w-full h-full text-center backdrop-blur-md absolute left-0 top-0">
          <p
            className="text-white absolute text-center flex flex-row items-center font-assasin p-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: gameContainer.zoom * 32,
              width: (gameContainer.zoom * BoardWidth) / 2,
              height: gameContainer.zoom * 80,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 999,
            }}
          >
            Please rotate your device to landscape
          </p>
        </div>
      </Orientation>
    </DeviceOrientation>
  );
}

export default App;
