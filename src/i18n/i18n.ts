import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { enUS as enUSLanguage } from "./lang/enUS";
import { zhCN as zhCNLanguage } from "./lang/zhCN";
import { esES as esESLanguage } from "./lang/esES";
import { deDE as deDELanguage } from "./lang/deDE";
import { jaJP as jaJPLanguage } from "./lang/jaJP";

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
    "es-ES": esESLanguage,
    "de-DE": deDELanguage,
    "ja-JP": jaJPLanguage,
  },
});

export default i18next;
