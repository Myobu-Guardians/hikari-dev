import React from "react";
import { useTranslation } from "react-i18next";
import { GameContainer } from "../containers/game";

export default function ConnectToWallet() {
  const { t } = useTranslation();
  const gameContainer = GameContainer.useContainer();
  return (
    <div>
      <button
        className="btn btn-sm m-1 absolute z-20 font-sans"
        style={{
          width: gameContainer.zoom * 120,
          height: gameContainer.zoom * 32,
          fontSize: gameContainer.zoom * 10,
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 138,
        }}
        onClick={() => {
          gameContainer.connectToMetaMask();
        }}
        title={gameContainer.signerAddress || ""}
      >
        {gameContainer.signerAddress
          ? gameContainer.signerAddress.slice(0, 12) + "..."
          : t("Connect to wallet")}
      </button>
    </div>
  );
}
