import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { useTranslation } from "react-i18next";

export enum FontOnCard {
  Assasin = "assasin",
  Sans = "sans",
}

export const SettingsContainer = createContainer(() => {
  const [fontOnCard, setFontOnCard] = useState<FontOnCard>(FontOnCard.Assasin);
  const [lang, setLang] = useState<string>(
    localStorage.getItem("settings/language") || "en-US"
  );
  const { i18n } = useTranslation();

  const setFontOnCardHandler = useCallback((fontOnCard: FontOnCard) => {
    setFontOnCard(fontOnCard);
    localStorage.setItem("settings/fontOnCard", fontOnCard);
  }, []);

  const setLanguage = useCallback(
    (lang: string) => {
      if (
        lang === "en-US" ||
        lang === "zh-CN" ||
        lang === "es-ES" ||
        lang === "de-DE" ||
        lang === "ja-JP"
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
    const fontOnCard = localStorage.getItem("settings/fontOnCard");
    if (
      fontOnCard &&
      (fontOnCard === FontOnCard.Assasin || fontOnCard === FontOnCard.Sans)
    ) {
      setFontOnCard(fontOnCard as FontOnCard);
    }
  }, []);

  return {
    fontOnCard,
    setFontOnCard: setFontOnCardHandler,
    lang,
    setLanguage,
  };
});
