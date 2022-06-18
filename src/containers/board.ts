import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";

export const BoardContainer = createContainer(() => {
  const [board, setBoard] = useState<GameBoard>(new GameBoard());
  useEffect(() => {
    (window as any)["board"] = board;
  }, [board]);
  return {
    board,
  };
});
