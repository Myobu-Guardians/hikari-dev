import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";
import { useTranslation } from "react-i18next";

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);
  const [lang, setLang] = useState<string>(
    localStorage.getItem("settings/language") || "en-US"
  );
  const { i18n } = useTranslation();

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
    setZoom(zoom);
  }, []);

  const setLanguage = useCallback(
    (lang: string) => {
      if (
        lang === "en-US" ||
        lang === "zh-CN" ||
        lang === "es-ES" ||
        lang === "de-DE"
      ) {
        localStorage.setItem("settings/language", lang);
        setLang(lang);
        i18n.changeLanguage(lang);
      } else {
        localStorage.setItem("settings/language", "en-US");
        setLang("en-US");
        i18n.changeLanguage("en-US");
      }
    },
    [i18n]
  );

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return {
    zoom,
    resize,
    lang,
    setLanguage,
  };
});
