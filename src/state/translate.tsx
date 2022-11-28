import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLang from '../assets/localisation/en/translate.json';
import ruLang from '../assets/localisation/ru/translate.json';

// translation catalog
const resources = {
  en: enLang,
  ru: ruLang,
};

// initialize i18next with catalog and language to use
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage'],
    },
  });

export default i18n;
