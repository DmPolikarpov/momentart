import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Available languages configuration
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const setTextColor = () => {
    return isScrolled ? 'text-gray-700' : 'text-gray-300'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center space-x-2 ${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium outline-none`}>
        <Languages className="w-4 h-4" />
        <span className="text-sm font-semibold flex items-center space-x-1">
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.code.toUpperCase()}</span>
        </span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] bg-white border border-gray-200 shadow-lg z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-green-50 transition-colors ${
              i18n.language === language.code ? 'bg-green-50 text-green-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;