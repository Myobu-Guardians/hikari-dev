import React, { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const zoom = Math.min(width / BoardWidth, height / BoardHeight);
      setZoom(zoom);
    };
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return {
    zoom,
  };
});
