// FIX: Replaced placeholder content with a functional Header component to display the application title.
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Lista de Compras
      </h1>
      <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
        Sua lista de compras moderna e inteligente.
      </p>
    </header>
  );
};
