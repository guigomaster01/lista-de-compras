import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';

export const LANGUAGE_OPTIONS: { code: Language; label: string; shortLabel: string; flag: string }[] = [
  { code: 'pt', label: 'Português (BR)', shortLabel: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'English (EN)', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'Español (ES)', shortLabel: 'ES', flag: '🇪🇸' },
  { code: 'zh', label: '中文 (普通话)', shortLabel: '中文', flag: '🇨🇳' },
];

const SHORT_MONTHS: Record<Language, string[]> = {
  pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
};

const FULL_MONTHS: Record<Language, string[]> = {
  pt: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  es: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  zh: [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月',
  ],
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  formatCurrency: (value: number) => string;
  formatShortMonth: (monthKey: string) => string;
  formatMonthLabel: (monthKey: string) => string;
  formatPercent: (value: number) => string;
  currencySymbol: string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'en' || saved === 'pt' || saved === 'es' || saved === 'zh') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'pt';
  });

  useEffect(() => {
    const htmlLangMap: Record<Language, string> = {
      pt: 'pt-BR',
      en: 'en',
      es: 'es',
      zh: 'zh-CN',
    };
    document.documentElement.lang = htmlLangMap[language];
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
      switch (language) {
        case 'en':
          return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        case 'es':
          return value.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'USD',
          });
        case 'zh':
          return value.toLocaleString('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          });
        case 'pt':
        default:
          return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
      }
    },
    [language]
  );

  const formatShortMonth = useCallback(
    (monthKey: string) => {
      const [year, month] = monthKey.split('-').map(Number);
      if (!year || !month || month < 1 || month > 12) return monthKey;
      const list = SHORT_MONTHS[language];
      if (language === 'zh') {
        return `${String(year).slice(-2)}年${list[month - 1]}`;
      }
      return `${list[month - 1]}/${String(year).slice(-2)}`;
    },
    [language]
  );

  const formatMonthLabel = useCallback(
    (monthKey: string) => {
      const [year, month] = monthKey.split('-').map(Number);
      if (!year || !month || month < 1 || month > 12) return monthKey;
      const monthName = FULL_MONTHS[language][month - 1];
      if (language === 'en') return `${monthName} ${year}`;
      if (language === 'zh') return `${year}年 ${monthName}`;
      return `${monthName} de ${year}`;
    },
    [language]
  );

  const formatPercent = useCallback(
    (value: number) => {
      const fixed = value.toFixed(1);
      return language === 'pt' || language === 'es'
        ? `${fixed.replace('.', ',')}%`
        : `${fixed}%`;
    },
    [language]
  );

  const currencySymbolMap: Record<Language, string> = {
    pt: 'R$',
    en: '$',
    es: '$',
    zh: '¥',
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        formatCurrency,
        formatShortMonth,
        formatMonthLabel,
        formatPercent,
        currencySymbol: currencySymbolMap[language],
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
