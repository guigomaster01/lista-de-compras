import React from 'react';
import { isFirebaseConfigured } from '../lib/firebase';

interface LoginScreenProps {
  onGoogleLogin: () => void;
  onContinueLocalDemo: () => void;
  isLoading: boolean;
  error: string | null;
}

const ADVANTAGES = [
  {
    title: 'Comparativo de preços mês a mês',
    description:
      'Veja na hora, direto no corredor do mercado, quanto você pagou no mesmo item no mês anterior e saiba se está caro ou barato.',
    badge: 'Economia real',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: 'Compartilhamento em tempo real',
    description:
      'Gere um link único da sua lista e envie no WhatsApp. Duas pessoas podem marcar itens no carrinho ao mesmo tempo.',
    badge: 'Em família',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Importe a lista do mês passado com 1 clique',
    description:
      'Não perca tempo digitando tudo do zero. Reaproveite os produtos do mês anterior e atualize apenas os preços no mercado.',
    badge: 'Praticidade',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
  },
  {
    title: 'Sem surpresas na hora de passar no caixa',
    description:
      'Acompanhe o valor exato do que já está no carrinho, o que falta pegar e o gráfico de gastos por categoria (Açougue, Limpeza, Hortifrúti).',
    badge: 'Controle total',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoogleLogin,
  onContinueLocalDemo,
  isLoading,
  error,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero / CTA Principal */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/70 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          100% gratuito • Sem anúncios • Rápido no celular
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          Sua ida ao supermercado mais rápida, organizada e econômica.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Monte sua lista em segundos, saiba se os preços subiram em relação ao mês passado, calcule o total do carrinho em tempo real e compartilhe a lista com a família pelo WhatsApp.
        </p>

        {error && (
          <div className="mt-5 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Botões de Ação (CTA) */}
        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {isFirebaseConfigured && (
            <button
              type="button"
              onClick={onGoogleLogin}
              disabled={isLoading}
              className="h-11 px-5 inline-flex items-center justify-center gap-2.5 text-sm font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4 flex-shrink-0 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
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
              <span>
                {isLoading ? 'Conectando...' : 'Entrar com Google e salvar na nuvem'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onContinueLocalDemo}
            className={`h-11 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              isFirebaseConfigured
                ? 'text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80'
                : 'text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold shadow-xs'
            }`}
          >
            <span>Começar agora sem cadastro</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          {isFirebaseConfigured
            ? 'Ao entrar com o Google você sincroniza suas listas entre celular e computador e pode compartilhar via link.'
            : 'Seus itens ficam salvos automaticamente no navegador deste aparelho, sem precisar criar conta.'}
        </p>

        {/* Prévia visual de como funciona no mercado */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Veja como fica sua lista no mercado
          </div>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800 p-3.5 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-4 h-4 rounded border border-emerald-500 bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                  ✓
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Azeite de Oliva Extra Virgem
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      Mercearia
                    </span>
                  </div>
                  <span className="inline-block mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ↓ R$ 3,50 mais barato que no mês passado (R$ 42,90)
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums flex-shrink-0">
                R$ 39,40
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Café Torrado e Moído 500g (2 un)
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      Padaria & Matinais
                    </span>
                  </div>
                  <span className="inline-block mt-0.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    ↑ +R$ 1,20 por un. em relação ao mês anterior
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums flex-shrink-0">
                R$ 37,80
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade de Vantagens */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Por que usar a Lista de Compras?
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Feita para usar com uma mão no mercado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADVANTAGES.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-2xs flex flex-col justify-between gap-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final no rodapé */}
      <section className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1 max-w-md">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Pronto para organizar a compra deste mês?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Escolha itens do catálogo pronto por corredor ou crie sua própria lista personalizada em segundos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2.5 flex-shrink-0">
          {isFirebaseConfigured ? (
            <>
              <button
                type="button"
                onClick={onGoogleLogin}
                disabled={isLoading}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-center"
              >
                {isLoading ? 'Conectando...' : 'Criar minha lista com Google'}
              </button>
              <button
                type="button"
                onClick={onContinueLocalDemo}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors cursor-pointer text-center"
              >
                Testar sem login
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onContinueLocalDemo}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-center"
            >
              Montar minha lista agora
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
