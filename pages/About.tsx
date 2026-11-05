import React from 'react';
import { useLanguage } from '../lib/i18n';

export const About: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xs animate-fade-in">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {isEn ? 'About the project' : 'Sobre o projeto'}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {isEn
          ? 'A fast, streamlined web application for planning and tracking your monthly grocery shopping. Items can be saved locally in your browser or synced to the cloud with Google Sign-In, allowing you to track what is left to pick up, compare prices across months, and share your list in real time.'
          : 'Aplicação web direta para planejamento e controle rápido de compras. Os itens adicionados ficam salvos localmente no navegador ou sincronizados na nuvem com login Google, permitindo acompanhar o que falta pegar, comparar preços entre meses e compartilhar sua lista em tempo real.'}
      </p>

      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isEn ? 'Tech Stack' : 'Stack técnica'}
        </h3>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">React 19 + TypeScript</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isEn
                ? 'State management, static typing, and real-time Firebase sync.'
                : 'Gerenciamento de estado, tipagem estática e sincronização em tempo real com Firebase.'}
            </dd>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">Tailwind CSS v4 + Vite</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isEn
                ? 'Utility-first styling compiled via the official Vite plugin.'
                : 'Estilização utilitária compilada via plugin oficial do Vite.'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
