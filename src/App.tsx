/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import Board from "./components/Board";
import { BoardContainer } from "./containers/board";
import { GameContainer } from "./containers/game";

function App() {
  const gameContainer = GameContainer.useContainer();
  return (
    <div className="container mx-auto px-4 select-none font-assasin">
      <BoardContainer.Provider>
        <Board></Board>
      </BoardContainer.Provider>
    </div>
  );
}

export default App;
