import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';

const SHORT_MONTHS_PT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

const SHORT_MONTHS_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const FULL_MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const FULL_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  formatCurrency: (value: number) => string;
  formatShortMonth: (monthKey: string) => string;
  formatMonthLabel: (monthKey: string) => string;
  currencySymbol: string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'pt') return saved;
    } catch {
      // ignore storage errors
    }
    return 'pt';
  });

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const formatCurrency = useCallback(
    (value: number) => {
      if (language === 'en') {
        return value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
      }
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
    [language]
  );

  const formatShortMonth = useCallback(
    (monthKey: string) => {
      const [year, month] = monthKey.split('-').map(Number);
      if (!year || !month || month < 1 || month > 12) return monthKey;
      const list = language === 'en' ? SHORT_MONTHS_EN : SHORT_MONTHS_PT;
      return `${list[month - 1]}/${String(year).slice(-2)}`;
    },
    [language]
  );

  const formatMonthLabel = useCallback(
    (monthKey: string) => {
      const [year, month] = monthKey.split('-').map(Number);
      if (!year || !month || month < 1 || month > 12) return monthKey;
      if (language === 'en') {
        return `${FULL_MONTHS_EN[month - 1]} ${year}`;
      }
      return `${FULL_MONTHS_PT[month - 1]} de ${year}`;
    },
    [language]
  );

  const currencySymbol = language === 'en' ? '$' : 'R$';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        formatCurrency,
        formatShortMonth,
        formatMonthLabel,
        currencySymbol,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

