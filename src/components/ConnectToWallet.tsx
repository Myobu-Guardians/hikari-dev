import React from "react";
import { useTranslation } from "react-i18next";
import { GameContainer } from "../containers/game";
import MetaMaskLogo from "../assets/images/icons/metamask.png";
import WalletConnectLogo from "../assets/images/icons/walletconnect.png";
import LogoutLogo from "../assets/images/icons/logout.png";
import { WalletConnectMethod } from "../lib/wallet";

export default function ConnectToWallet() {
  const { t } = useTranslation();
  const gameContainer = GameContainer.useContainer();
  return (
    <>
      <div
        className="dropdown dropdown-end absolute font-sans z-20"
        style={{
          top: gameContainer.zoom * 4,
          right: gameContainer.zoom * 138,
        }}
      >
        <label
          tabIndex={0}
          className={
            "btn btn-sm m-1 " +
            (gameContainer.signerAddress && !gameContainer.isCorrectNetwork()
              ? " btn-error normal-case"
              : "")
          }
          style={{
            fontSize: gameContainer.zoom * 10,
            width: gameContainer.zoom * 128,
            height: gameContainer.zoom * 32,
          }}
          title={gameContainer.signerAddress || ""}
        >
          {gameContainer.signerAddress ? (
            gameContainer.isCorrectNetwork() && gameContainer.playerProfile ? (
              <div className="flex flex-row items-center text-left normal-case">
                <img
                  src={gameContainer.playerProfile.avatar}
                  alt={gameContainer.playerProfile.username}
                  style={{
                    height: gameContainer.zoom * 20,
                  }}
                  className={"rounded-md mr-2"}
                ></img>
                <div className="flex flex-col items-start">
                  <p
                    style={{
                      fontSize: gameContainer.zoom * 10,
                    }}
                  >
                    {gameContainer.playerProfile.username}
                  </p>
                  <p
                    style={{
                      fontSize: gameContainer.zoom * 8,
                    }}
                    className={"font-normal"}
                  >
                    {gameContainer.playerProfile.walletAddress.slice(0, 12) +
                      "..."}
                  </p>
                </div>
              </div>
            ) : (
              t("Wrong Network")
            )
          ) : (
            t("Connect Wallet")
          )}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-0 shadow bg-black text-white rounded-box w-64"
          style={{
            fontSize: gameContainer.zoom * 10,
          }}
        >
          {(window as any)["ethereum"] && (
            <li>
              <label
                onClick={() => {
                  gameContainer.connectToMetaMask();
                }}
                className={
                  gameContainer.connectedWalletMethod ===
                  WalletConnectMethod.MetaMask
                    ? "bg-primary-content"
                    : ""
                }
              >
                <div className={"flex flex-row items-center"}>
                  <img
                    src={MetaMaskLogo}
                    style={{ height: gameContainer.zoom * 24 }}
                    className={"mr-2"}
                    alt={`MetaMask`}
                  />
                  {`MetaMask`}
                </div>
              </label>
            </li>
          )}
          <li>
            <label
              onClick={() => {
                gameContainer.connectToWalletConnect();
              }}
              className={
                gameContainer.connectedWalletMethod ===
                WalletConnectMethod.WalletConnect
                  ? "bg-primary-content"
                  : ""
              }
            >
              {" "}
              <div className={"flex flex-row items-center "}>
                <img
                  src={WalletConnectLogo}
                  style={{ height: gameContainer.zoom * 24 }}
                  className={"mr-2"}
                  alt={`WalletConnect`}
                />
                {`WalletConnect`}
              </div>
            </label>
          </li>
          <hr></hr>
          <li>
            <label
              onClick={() => {
                gameContainer.disconnectWallet();
              }}
            >
              {" "}
              <div className="flex flex-row items-center">
                <img
                  src={LogoutLogo}
                  style={{ height: gameContainer.zoom * 24 }}
                  className={"mr-2"}
                  alt={`Disconnect Wallet`}
                />
                {t("Disconnect Wallet")}
              </div>
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}
