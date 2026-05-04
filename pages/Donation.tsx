import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, CheckCircle2, Coffee, QrCode } from 'lucide-react';

export const Donation: React.FC = () => {
  const pixKey = 'contatorodrigorodrigues@gmail.com';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      key="donation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-900 rounded-3xl card-shadow border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10 text-center"
    >
      <div className="inline-flex p-4 rounded-3xl bg-red-50 dark:bg-red-500/10 text-red-500 mb-6">
        <Heart size={40} fill="currentColor" className="animate-pulse" />
      </div>

      <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
        Apoie este Projeto
      </h2>

      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
        Gostou da experiência? Sua contribuição ajuda a manter o servidor ativo e a trazer novas funcionalidades para tornar sua vida mais organizada.
      </p>

      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center gap-4">
            {/* <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <QrCode size={120} className="text-slate-800 dark:text-slate-200" />
            </div> */}
            <div className="w-full">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 text-left">
                Chave PIX (E-mail)
              </p>
              <div className="flex items-center gap-2 p-1.5 pl-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="flex-grow text-left font-mono text-sm text-slate-700 dark:text-slate-300 truncate">
                  {pixKey}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${copied
                      ? 'bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20'
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20'
                    }`}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 dark:text-slate-500 text-sm font-medium pt-4">
          <div className="flex items-center gap-2">
            <Coffee size={16} />
            <span>Pague um café para o dev</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Muito obrigado pelo apoio!</span>
        </div>
      </div>
    </motion.div>
  );
};
