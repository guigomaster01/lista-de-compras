import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { useLanguage } from '../lib/i18n';
import type { Language } from '../types';

interface MonthlyBarProps {
  monthKey: string;
  onChangeMonth: (nextMonthKey: string) => void;
  shareId: string;
  isSharedView: boolean;
  sharedOwnerName?: string;
  onExitSharedView: () => void;
  isSyncedCloud: boolean;
}

const shiftMonth = (monthKey: string, delta: number): string => {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
  return `${nextYear}-${nextMonth}`;
};

const MONTHLY_COPY: Record<
  Language,
  {
    viewingShared: (owner?: string) => string;
    backToMyLists: string;
    prevMonth: string;
    selectMonth: string;
    nextMonth: string;
    copyTitle: string;
    copied: string;
    shareList: string;
  }
> = {
  pt: {
    viewingShared: (owner) =>
      `Visualizando lista compartilhada${owner ? ` de ${owner}` : ''} (`,
    backToMyLists: 'Voltar para minhas listas',
    prevMonth: 'Mês anterior',
    selectMonth: 'Selecionar mês da lista',
    nextMonth: 'Próximo mês',
    copyTitle: 'Copiar link único para compartilhar esta lista',
    copied: 'Link copiado!',
    shareList: 'Compartilhar Lista',
  },
  en: {
    viewingShared: (owner) =>
      `Viewing shared list${owner ? ` by ${owner}` : ''} (`,
    backToMyLists: 'Back to my lists',
    prevMonth: 'Previous month',
    selectMonth: 'Select list month',
    nextMonth: 'Next month',
    copyTitle: 'Copy unique link to share this list',
    copied: 'Link copied!',
    shareList: 'Share List',
  },
  es: {
    viewingShared: (owner) =>
      `Viendo lista compartida${owner ? ` de ${owner}` : ''} (`,
    backToMyLists: 'Volver a mis listas',
    prevMonth: 'Mes anterior',
    selectMonth: 'Seleccionar mes de la lista',
    nextMonth: 'Mes siguiente',
    copyTitle: 'Copiar enlace único para compartir esta lista',
    copied: '¡Enlace copiado!',
    shareList: 'Compartir Lista',
  },
  zh: {
    viewingShared: (owner) =>
      `正在查看${owner ? ` ${owner} 的` : ''}共享清单 (`,
    backToMyLists: '返回我的清单',
    prevMonth: '上个月',
    selectMonth: '选择清单月份',
    nextMonth: '下个月',
    copyTitle: '复制专属链接以共享此清单',
    copied: '链接已复制！',
    shareList: '共享清单',
  },
};

export const MonthlyBar: React.FC<MonthlyBarProps> = ({
  monthKey,
  onChangeMonth,
  shareId,
  isSharedView,
  sharedOwnerName,
  onExitSharedView,
}) => {
  const [copied, setCopied] = useState(false);
  const { language, formatMonthLabel } = useLanguage();
  const t = MONTHLY_COPY[language];

  const shareUrl = `${window.location.origin}${window.location.pathname}?lista=${shareId}`;

  const handleCopyShareLink = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-3">
      {isSharedView && (
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>
              {t.viewingShared(sharedOwnerName)}
              <strong>{formatMonthLabel(monthKey)}</strong>)
            </span>
          </div>
          <button
            type="button"
            onClick={onExitSharedView}
            className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:opacity-80 cursor-pointer"
          >
            {t.backToMyLists}
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Seletor de Mês */}
        <div className="flex items-center justify-between sm:justify-start gap-2">
          {!isSharedView && (
            <button
              type="button"
              onClick={() => onChangeMonth(shiftMonth(monthKey, -1))}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              aria-label={t.prevMonth}
              title={t.prevMonth}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-2">
            <label htmlFor="month-picker" className="sr-only">
              {t.selectMonth}
            </label>
            <input
              id="month-picker"
              type="month"
              value={monthKey}
              disabled={isSharedView}
              onChange={(e) => {
                if (e.target.value) onChangeMonth(e.target.value);
              }}
              className="h-8 px-2.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 disabled:opacity-70"
            />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hidden md:inline">
              {formatMonthLabel(monthKey)}
            </span>
          </div>

          {!isSharedView && (
            <button
              type="button"
              onClick={() => onChangeMonth(shiftMonth(monthKey, 1))}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              aria-label={t.nextMonth}
              title={t.nextMonth}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Compartilhamento com URL única */}
        <div className="flex items-center justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/80">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer flex-shrink-0"
            title={t.copyTitle}
          >
            <CopyIcon className="w-3.5 h-3.5" />
            <span>{copied ? t.copied : t.shareList}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
