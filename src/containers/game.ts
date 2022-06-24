import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);
  const [needsRotation, setNeedsRotation] = useState<boolean>(false);

  const resize = useCallback(() => {
    const orientation =
      (window.screen.orientation || {}).type ||
      (window.screen as any).mozOrientation ||
      (window.screen as any).msOrientation ||
      "landscape-primary";

    const width = window.innerWidth;
    const height = window.innerHeight;
    const zoom = orientation.match(/^landscape/)
      ? Math.min(width / BoardWidth, height / BoardHeight)
      : Math.min(width / BoardHeight, height / BoardWidth);
    setNeedsRotation(width < height);
    setZoom(zoom);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return {
    zoom,
    needsRotation,
    resize,
  };
});
