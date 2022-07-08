import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GameContainer } from "./containers/game";
import "toastr/build/toastr.min.css";
import "./i18n/i18n";
import { SettingsContainer } from "./containers/settings";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GameContainer.Provider>
    <SettingsContainer.Provider>
      <App></App>
    </SettingsContainer.Provider>
  </GameContainer.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
