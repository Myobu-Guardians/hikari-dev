import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BoardContainer } from "../containers/board";
import toastr from "toastr";
import { GameContainer } from "../containers/game";
import { PlayerProfile, PlayerProfileRole } from "../lib/player";
import SendMessageInput from "./SendMessageInput";

function PlayerProfileListItem({
  playerProfile,
}: {
  playerProfile: PlayerProfile;
}) {
  const gameContainer = GameContainer.useContainer();
  return (
    <div
      className="flex flex-row items-center text-left normal-case"
      key={playerProfile.walletAddress}
    >
      <img
        src={playerProfile.avatar}
        alt={playerProfile.username}
        style={{
          height: 36,
        }}
        className={"rounded-md mr-2"}
      ></img>
      <div className="flex flex-col items-start">
        <p
          style={
            {
              // fontSize: gameContainer.zoom * 10,
            }
          }
        >
          {playerProfile.username}
        </p>
        <p
          style={
            {
              // fontSize: gameContainer.zoom * 8,
            }
          }
          className={"font-normal"}
        >
          {playerProfile.walletAddress.slice(0, 12) + "..."}
        </p>
      </div>
    </div>
  );
}

export default function PrivateMatchModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(
    localStorage.getItem("private-match-room-name") || ""
  );
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const [lightPlayers, setLightPlayers] = useState<PlayerProfile[]>([]);
  const [darkPlayers, setDarkPlayers] = useState<PlayerProfile[]>([]);
  const [viewers, setViewers] = useState<PlayerProfile[]>([]);
  const boardContainer = BoardContainer.useContainer();

  useEffect(() => {
    setIsJoiningRoom(false);
  }, [boardContainer.isInPrivateMatchRoom]);

  useEffect(() => {
    console.log("* boardContainer.playersInRoom", boardContainer.playersInRoom);
    const lightPlayers = boardContainer.playersInRoom.filter(
      (playerProfile) => playerProfile.role === PlayerProfileRole.LightPlayer
    );
    const darkPlayers = boardContainer.playersInRoom.filter(
      (playerProfile) => playerProfile.role === PlayerProfileRole.DarkPlayer
    );
    const viewers = boardContainer.playersInRoom.filter(
      (playerProfile) => playerProfile.role === PlayerProfileRole.Viewer
    );
    setLightPlayers(lightPlayers);
    setDarkPlayers(darkPlayers);
    setViewers(viewers);
  }, [boardContainer.playersInRoom]);

  return (
    <>
      <input
        type="checkbox"
        id="private-match-modal"
        className="modal-toggle"
        onChange={(event) => {
          setOpen(event.target.checked);
        }}
      ></input>
      {open && (
        <label htmlFor="private-match-modal" className="modal font-sans">
          <label className="modal-box relative pb-10" htmlFor="">
            <div className="flex flex-row items-center justify-between text-xl font-bold mb-4">
              <h3 className="mb-2">{t("Private match")}</h3>
              {boardContainer.isInPrivateMatchRoom ? (
                <label
                  className="btn btn-secondary"
                  htmlFor="private-match-modal"
                  onClick={() => {
                    boardContainer.leavePrivateMatchRoom();
                  }}
                >
                  {t("Leave room")}
                </label>
              ) : (
                <label
                  htmlFor="private-match-modal"
                  className="btn btn-circle btn-sm btn-ghost border-0"
                >
                  {"✖"}
                </label>
              )}
            </div>
            {boardContainer.isInPrivateMatchRoom ? (
              <div>
                <p className="mb-2">
                  <span>{t("Room")}:</span>
                  <strong className="ml-2">{roomName}</strong>
                </p>
                <div className="flex flex-row mb-4">
                  <div
                    className={
                      "w-1/2 bordered shadow-sm bg-primary-content py-4 px-2 mr-1 cursor-pointer"
                    }
                    onClick={() => {
                      boardContainer.playAsRoleInPrivateMatchRoom(
                        PlayerProfileRole.LightPlayer
                      );
                    }}
                  >
                    <p className="mb-2 rounded-md font-bold text-lg">
                      {t("Light")}
                    </p>
                    <div>
                      {lightPlayers.length ? (
                        lightPlayers.map((playerProfile) => (
                          <PlayerProfileListItem
                            playerProfile={playerProfile}
                            key={playerProfile.walletAddress}
                          ></PlayerProfileListItem>
                        ))
                      ) : (
                        <p>{t("None")}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      "w-1/2 bordered shadow-sm bg-primary-content py-4 px-2 ml-1 cursor-pointer"
                    }
                    onClick={() => {
                      boardContainer.playAsRoleInPrivateMatchRoom(
                        PlayerProfileRole.DarkPlayer
                      );
                    }}
                  >
                    <p className="mb-2 rounded-md font-bold text-lg">
                      {t("Dark")}
                    </p>
                    <div>
                      {darkPlayers.length ? (
                        darkPlayers.map((playerProfile) => (
                          <PlayerProfileListItem
                            playerProfile={playerProfile}
                            key={playerProfile.walletAddress}
                          ></PlayerProfileListItem>
                        ))
                      ) : (
                        <p>{t("None")}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="bordered shadow-sm bg-primary-content py-4 px-2 cursor-pointer"
                  onClick={() => {
                    boardContainer.playAsRoleInPrivateMatchRoom(
                      PlayerProfileRole.Viewer
                    );
                  }}
                >
                  <p className="mb-2 rounded-md font-bold text-lg">
                    {t("Spectators")}
                  </p>
                  <div>
                    {viewers.length > 0 ? (
                      viewers.map((playerProfile) => {
                        return (
                          <PlayerProfileListItem
                            playerProfile={playerProfile}
                            key={playerProfile.walletAddress}
                          ></PlayerProfileListItem>
                        );
                      })
                    ) : (
                      <p>{t("None")}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-4 flex flex-row justify-end">
                  <SendMessageInput className="w-full"></SendMessageInput>
                </div>
                <div className="mt-4 flex flex-row justify-end">
                  {boardContainer.board &&
                  boardContainer.board.gameMode === "remote" ? (
                    <label
                      htmlFor="private-match-modal"
                      className="btn btn-primary"
                    >
                      {boardContainer.isPlayingGame
                        ? t("Back to match")
                        : t("Watch match")}
                    </label>
                  ) : boardContainer.peer &&
                    boardContainer.peer.isPubsubHost() ? (
                    lightPlayers.length === 1 && darkPlayers.length === 1 ? (
                      <label
                        className="btn btn-primary"
                        htmlFor="private-match-modal"
                        onClick={() => {
                          boardContainer.startMatchInPrivateMatchRoom(
                            lightPlayers[0],
                            darkPlayers[0]
                          );
                        }}
                      >
                        {t("Start match")}
                      </label>
                    ) : (
                      <p className="">
                        {t("Waiting for light and dark players to get ready")}
                      </p>
                    )
                  ) : (
                    <p className="">
                      {t("Waiting for room host to start match")}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="form-control">
                <div className="input-group">
                  <input
                    type={"text"}
                    placeholder={t("Room name")}
                    className="input input-bordered w-full max-w-xs"
                    value={roomName}
                    onChange={(event) => {
                      localStorage.setItem(
                        "private-match-room-name",
                        event.target.value
                      );
                      setRoomName(event.target.value);
                    }}
                  ></input>
                  <button
                    className="btn btn-square w-40"
                    onClick={() => {
                      if (roomName) {
                        setIsJoiningRoom(true);
                        boardContainer.joinPrivateMatchRoom(roomName);
                      } else {
                        toastr.error("Room name is required");
                      }
                    }}
                    disabled={isJoiningRoom}
                  >
                    {isJoiningRoom ? t("Joining...") : t("Join")}
                  </button>
                </div>
              </div>
            )}
          </label>
        </label>
      )}
    </>
  );
}
