/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import Board from "./components/Board";
import { BoardContainer } from "./containers/board";

function App() {
  return (
    <div className="container mx-auto px-4">
      <BoardContainer.Provider>
        <Board></Board>
      </BoardContainer.Provider>
    </div>
  );
}

export default App;
