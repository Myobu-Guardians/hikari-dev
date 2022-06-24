/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import { BoardContainer } from "./containers/board";
import { GameContainer } from "./containers/game";

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
    </div>
  );
}

export default App;
