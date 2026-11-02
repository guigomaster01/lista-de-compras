import React from 'react';
import { isFirebaseConfigured } from '../lib/firebase';

interface LoginScreenProps {
  onGoogleLogin: () => void;
  onContinueLocalDemo: () => void;
  isLoading: boolean;
  error: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoogleLogin,
  onContinueLocalDemo,
  isLoading,
  error,
}) => {
  return (
    <div className="max-w-md mx-auto mt-8 sm:mt-14 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xs animate-fade-in">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-semibold text-sm tracking-tight mb-5">
        LC
      </div>

      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Acesse suas listas de compras
      </h2>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Entre com sua conta Google para salvar suas listas organizadas por mês na nuvem e gerar links únicos de compartilhamento.
      </p>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onGoogleLogin}
          disabled={isLoading || !isFirebaseConfigured}
          className="w-full h-10 px-4 inline-flex items-center justify-center gap-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{isLoading ? 'Conectando...' : 'Continuar com Google'}</span>
        </button>

        {!isFirebaseConfigured && (
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
            <p className="font-medium text-zinc-800 dark:text-zinc-200">
              Credenciais do Firebase ainda não configuradas
            </p>
            <p>
              Preencha as variáveis <code className="font-mono text-[11px]">VITE_FIREBASE_*</code> no arquivo <code className="font-mono text-[11px]">.env.local</code> (veja o <code className="font-mono text-[11px]">.env.example</code>) para ativar o login Google e o Firestore.
            </p>
            <button
              type="button"
              onClick={onContinueLocalDemo}
              className="mt-1 w-full py-2 px-3 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Testar listas mensais em modo local
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
            Histórico mensal
          </span>
          Suas compras separadas por mês e ano automaticamente.
        </div>
        <div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
            URL compartilhável
          </span>
          Envie o link único do mês para outra pessoa acompanhar.
        </div>
      </div>
    </div>
  );
};

