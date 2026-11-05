import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';

export const LANGUAGE_OPTIONS: { code: Language; label: string; shortLabel: string; flag: string }[] = [
  { code: 'pt', label: 'Português (BR)', shortLabel: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'English (EN)', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'Español (ES)', shortLabel: 'ES', flag: '🇪🇸' },
  { code: 'zh', label: '中文 (普通话)', shortLabel: '中文', flag: '🇨🇳' },
];

const SEO_META: Record<Language, { title: string; description: string }> = {
  pt: {
    title: 'Lista de Compras de Supermercado Online Grátis | Compare Preços e Compartilhe',
    description:
      'Organize sua lista de compras de supermercado online grátis. Compare preços mês a mês, some o total do carrinho em tempo real, filtre por categorias e compartilhe no WhatsApp.',
  },
  en: {
    title: 'Free Online Grocery Shopping List | Compare Prices & Share in Real Time',
    description:
      'Build your monthly grocery shopping list in seconds. Compare prices month over month, track your cart total in real time, browse by aisle category, and share with family.',
  },
  es: {
    title: 'Lista de Compras de Supermercado Online Gratis | Compara Precios y Comparte',
    description:
      'Organiza tu lista de compras del supermercado online gratis. Compara precios mes a mes, calcula el total del carrito en tiempo real, filtra por pasillos y comparte por WhatsApp.',
  },
  zh: {
    title: '免费在线超市购物清单 | 跨月比价、分类规划与家人实时共享',
    description:
      '几秒钟创建每月超市采购清单。支持跨月历史价格对比、实时统计购物车总金额、按商品分类选购，并通过链接与家人实时协同共享。',
  },
};

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

const isValidLanguage = (val: string | null): val is Language =>
  val === 'pt' || val === 'en' || val === 'es' || val === 'zh';

const detectInitialLanguage = (): Language => {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (isValidLanguage(urlLang)) return urlLang;

    const saved = localStorage.getItem('language');
    if (isValidLanguage(saved)) return saved;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
  } catch {
    // ignore errors
  }
  return 'pt';
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
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    const htmlLangMap: Record<Language, string> = {
      pt: 'pt-BR',
      en: 'en',
      es: 'es',
      zh: 'zh-CN',
    };
    document.documentElement.lang = htmlLangMap[language];

    // Atualiza título e meta tags de SEO dinamicamente conforme o idioma
    const meta = SEO_META[language];
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const ogTitleEl = document.getElementById('og-title');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const ogDescEl = document.getElementById('og-description');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

    const twTitleEl = document.getElementById('twitter-title');
    if (twTitleEl) twTitleEl.setAttribute('content', meta.title);

    const twDescEl = document.getElementById('twitter-description');
    if (twDescEl) twDescEl.setAttribute('content', meta.description);

    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      const url = new URL(window.location.href);
      if (lang === 'pt' && !url.searchParams.has('lang')) {
        return;
      }
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore URL errors
    }
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
