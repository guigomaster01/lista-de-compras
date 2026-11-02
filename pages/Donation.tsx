import React, { useState } from 'react';
import { CopyIcon } from '../components/icons/CopyIcon';

export const Donation: React.FC = () => {
  const pixKey = 'contatorodrigorodrigues@gmail.com';
  const [copied, setCopied] = useState(false);

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
        Apoiar o projeto
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Se esta ferramenta é útil no seu dia a dia, você pode contribuir com qualquer valor via PIX para apoiar a manutenção do projeto.
      </p>

      <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Chave PIX (E-mail)
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1.5">
          <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">
            {pixKey}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex-shrink-0"
            aria-label="Copiar chave PIX"
          >
            <CopyIcon className="w-3.5 h-3.5" />
            <span>{copied ? 'Copiado' : 'Copiar chave'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
