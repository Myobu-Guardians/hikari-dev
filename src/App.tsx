/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import HikariBoard from "./assets/images/Hikari Playing Board with Items.png";
import { BoardHeight, BoardWidth, GameZoom } from "./lib/constants";

function App() {
  return (
    <div className="container mx-auto px-4">
      <div
        className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`}
        style={{
          width: `${BoardWidth * GameZoom}px`,
          height: `${BoardHeight * GameZoom}px`,
        }}
      >
        <img src={HikariBoard}></img>
      </div>
    </div>
  );
}

export default App;
