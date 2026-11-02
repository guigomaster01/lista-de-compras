import React from 'react';
import type { PageType } from '../types';

interface NavigationProps {
  page: PageType;
  setPage: (page: PageType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ page, setPage }) => {
  return (
    <nav className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
      {(['list', 'categories', 'about', 'donation'] as const).map((pageId) => {
        const pageName = {
          list: 'Lista',
          categories: 'Categorias',
          about: 'Sobre',
          donation: 'Apoiar',
        }[pageId];

        return (
          <button
            key={pageId}
            onClick={() => setPage(pageId)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              page === pageId
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {pageName}
          </button>
        );
      })}
    </nav>
  );
};
