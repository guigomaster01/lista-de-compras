import React, { useState } from 'react';
import { CopyIcon } from '../components/icons/CopyIcon';
import { useLanguage } from '../lib/i18n';
import type { Language } from '../types';

const DONATION_COPY: Record<
  Language,
  {
    title: string;
    description: string;
    keyLabel: string;
    copyAria: string;
    copied: string;
    copyBtn: string;
  }
> = {
  pt: {
    title: 'Apoiar o projeto',
    description:
      'Se esta ferramenta é útil no seu dia a dia, você pode contribuir com qualquer valor via PIX para apoiar a manutenção do projeto.',
    keyLabel: 'Chave PIX (E-mail)',
    copyAria: 'Copiar chave PIX',
    copied: 'Copiado',
    copyBtn: 'Copiar chave',
  },
  en: {
    title: 'Support the project',
    description:
      'If this tool helps you in your daily routine, you can contribute any amount via PIX / Email to support ongoing maintenance of the project.',
    keyLabel: 'PIX Key / Contact Email',
    copyAria: 'Copy PIX key',
    copied: 'Copied',
    copyBtn: 'Copy key',
  },
  es: {
    title: 'Apoyar el proyecto',
    description:
      'Si esta herramienta te resulta útil en tu día a día, puedes contribuir con cualquier importe vía PIX / Correo para apoyar el mantenimiento del proyecto.',
    keyLabel: 'Clave PIX / Correo electrónico',
    copyAria: 'Copiar clave PIX',
    copied: 'Copiado',
    copyBtn: 'Copiar clave',
  },
  zh: {
    title: '支持本项目',
    description:
      '如果这款工具对您的日常生活有所帮助，欢迎通过 PIX / 邮箱提供任意金额的赞助，以支持项目的持续维护与更新。',
    keyLabel: 'PIX 账号 / 联系邮箱',
    copyAria: '复制账号',
    copied: '已复制',
    copyBtn: '复制账号',
  },
};

export const Donation: React.FC = () => {
  const pixKey = import.meta.env.VITE_PIX_KEY || 'contatorodrigorodrigues@gmail.com';
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const t = DONATION_COPY[language];

  const handleCopy = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xs animate-fade-in">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {t.title}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {t.description}
      </p>

      <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {t.keyLabel}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1.5">
          <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">
            {pixKey}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex-shrink-0"
            aria-label={t.copyAria}
          >
            <CopyIcon className="w-3.5 h-3.5" />
            <span>{copied ? t.copied : t.copyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
