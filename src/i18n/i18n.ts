import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { enUS as enUSLanguage } from "./lang/enUS";
import { zhCN as zhCNLanguage } from "./lang/zhCN";

i18next.use(initReactI18next).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  keySeparator: false, // we do not use keys in form messages.welcome
  lng: localStorage.getItem("settings/language") || "en-US",
  fallbackLng: "en-US",
  resources: {
    "en-US": enUSLanguage,
    "zh-CN": zhCNLanguage,
  },
});

export default i18next;

export function languageCodeToLanguageName(code: string) {
  if (code === "zh-CN") {
    return "简体中文";
  } else if (code === "zh-HK") {
    return "繁体中文";
  } else if (code === "ja-JP") {
    return "日本語";
  } else {
    return "English";
  }
}
