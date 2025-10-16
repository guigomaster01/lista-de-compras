import React from 'react';

// FIX: The component was defined as a snippet, causing errors. It has been converted 
// into a full React component that accepts `page` and `setPage` props to handle navigation state.
interface NavigationProps {
  page: 'list' | 'about' | 'donation';
  setPage: (page: 'list' | 'about' | 'donation') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ page, setPage }) => {
  return (
    <nav className="flex justify-center gap-6 sm:gap-8 border-b border-slate-200 dark:border-slate-700 mb-6">
      {(['list', 'about', 'donation'] as const).map((pageId) => {
        const pageName = {
          list: 'Lista',
          about: 'Sobre',
          donation: 'Doação',
        }[pageId];

        return (
          <button
            key={pageId}
            onClick={() => setPage(pageId)}
            className={`px-1 py-3 text-sm sm:text-base font-medium transition-colors duration-300 relative ${
              page === pageId
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {pageName}
            {page === pageId && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
