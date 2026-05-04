import React from 'react';
import { Sun, Moon, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="relative flex flex-col items-center mb-10">
      <div className="absolute right-0 top-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 card-shadow border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4 p-4 rounded-3xl bg-indigo-600 dark:bg-indigo-500 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 text-white"
      >
        <ShoppingBag size={32} />
      </motion.div>

      <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight text-center">
        Lista de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Compras</span>
      </h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400 text-center font-medium max-w-sm mx-auto">
        Organize seus itens com estilo e facilidade.
      </p>
    </header>
  );
};
