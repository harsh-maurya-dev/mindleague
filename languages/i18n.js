import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../languages/en.json"
import ar from "../languages/ar.json"

const resources = {
  en:{translation : en},
  ar:{translation : ar}
}

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getCookie("i18next") || "en", // Default language
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "querystring",
        "path",
        "subdomain"
      ],
      caches: ["cookie"], // Must be an array
    },
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
