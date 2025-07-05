import { useTranslation } from 'react-i18next';

// Available languages configuration - should match LanguageSwitcher
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const getCurrentLanguageInfo = () => {
    return availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getCurrentLanguageInfo,
    availableLanguages,
    isRussian: i18n.language === 'ru',
    isEnglish: i18n.language === 'en'
  };
};