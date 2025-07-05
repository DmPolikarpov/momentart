import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enNavigation from './locales/en/navigation.json';
import enHomepage from './locales/en/homepage.json';
import enArticles from './locales/en/articles.json';
import enAuth from './locales/en/auth.json';
import enAdmin from './locales/en/admin.json';
import enPages from './locales/en/pages.json';
import enComponents from './locales/en/components.json';
import enCommon from './locales/en/common.json';

// Russian translations
import ruNavigation from './locales/ru/navigation.json';
import ruHomepage from './locales/ru/homepage.json';
import ruArticles from './locales/ru/articles.json';
import ruAuth from './locales/ru/auth.json';
import ruAdmin from './locales/ru/admin.json';
import ruPages from './locales/ru/pages.json';
import ruComponents from './locales/ru/components.json';
import ruCommon from './locales/ru/common.json';

const resources = {
  en: {
    translation: {
      ...enNavigation,
      ...enHomepage,
      ...enArticles,
      ...enAuth,
      ...enAdmin,
      ...enPages,
      ...enComponents,
      ...enCommon
    }
  },
  ru: {
    translation: {
      ...ruNavigation,
      ...ruHomepage,
      ...ruArticles,
      ...ruAuth,
      ...ruAdmin,
      ...ruPages,
      ...ruComponents,
      ...ruCommon
    }
  }
};

// Initialize i18n only if it hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
    });
}

export default i18n;