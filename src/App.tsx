/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import { BoardContainer } from "./containers/board";
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt";
const is = require("is_js");
(window as any)["is"] = is;

function App() {
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
  );
}

export default App;
