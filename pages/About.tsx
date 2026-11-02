import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xs animate-fade-in">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Sobre o projeto
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Aplicação web direta para planejamento e controle rápido de compras. Os itens adicionados ficam salvos localmente no navegador, permitindo acompanhar o que falta pegar e o custo total sem necessidade de cadastro.
      </p>

      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Stack técnica
        </h3>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">React 19 + TypeScript</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Gerenciamento de estado local e tipagem estática.
            </dd>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">Tailwind CSS v4 + Vite</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Estilização utilitária compilada via plugin oficial do Vite.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
