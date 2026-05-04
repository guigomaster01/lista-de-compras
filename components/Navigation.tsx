import React from 'react';
import { motion } from 'motion/react';
import { List, Info, Heart } from 'lucide-react';

interface NavigationProps {
  page: 'list' | 'about' | 'donation';
  setPage: (page: 'list' | 'about' | 'donation') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ page, setPage }) => {
  const tabs = [
    { id: 'list', label: 'Lista', icon: List },
    { id: 'about', label: 'Sobre', icon: Info },
    { id: 'donation', label: 'Doação', icon: Heart },
  ] as const;

  return (
    <nav className="flex justify-center mb-10">
      <div className="flex p-1.5 glass rounded-2xl card-shadow border border-slate-200/50 dark:border-slate-800/50">
        {tabs.map((tab) => {
          const isActive = page === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setPage(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'text-indigo-600 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-indigo-600 rounded-xl shadow-sm dark:shadow-indigo-900/40 border border-slate-200 dark:border-indigo-500/50"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
