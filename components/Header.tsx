import React, { useState } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { useLanguage, LANGUAGE_OPTIONS } from '../lib/i18n';
import type { PageType, Language } from '../types';

export interface AuthUserDisplay {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface HeaderProps {
  page: PageType;
  setPage: (page: PageType) => void;
  itemCount: number;
  completedCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: AuthUserDisplay | null;
  onLogout: () => void;
}

const HEADER_COPY: Record<
  Language,
  {
    badge: string;
    title: string;
    signInToSync: string;
    noItems: string;
    inCart: (done: number, total: number) => string;
    nav: Record<PageType, string>;
    signOut: string;
    lightMode: string;
    darkMode: string;
    closeMenu: string;
    openMenu: string;
    userFallback: string;
  }
> = {
  pt: {
    badge: 'LC',
    title: 'Lista de Compras',
    signInToSync: 'Faça login para sincronizar',
    noItems: 'Nenhum item na lista',
    inCart: (done, total) => `${done} de ${total} no carrinho`,
    nav: {
      list: 'Lista',
      categories: 'Categorias',
      about: 'Sobre',
      donation: 'Apoiar',
    },
    signOut: 'Sair',
    lightMode: 'Modo claro',
    darkMode: 'Modo escuro',
    closeMenu: 'Fechar menu',
    openMenu: 'Abrir menu de navegação',
    userFallback: 'Usuário',
  },
  en: {
    badge: 'SL',
    title: 'Shopping List',
    signInToSync: 'Sign in to sync',
    noItems: 'No items in the list',
    inCart: (done, total) => `${done} of ${total} in cart`,
    nav: {
      list: 'List',
      categories: 'Categories',
      about: 'About',
      donation: 'Support',
    },
    signOut: 'Sign out',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    closeMenu: 'Close menu',
    openMenu: 'Open navigation menu',
    userFallback: 'User',
  },
  es: {
    badge: 'LC',
    title: 'Lista de Compras',
    signInToSync: 'Inicia sesión para sincronizar',
    noItems: 'Ningún producto en la lista',
    inCart: (done, total) => `${done} de ${total} en el carrito`,
    nav: {
      list: 'Lista',
      categories: 'Categorías',
      about: 'Acerca de',
      donation: 'Apoyar',
    },
    signOut: 'Salir',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    closeMenu: 'Cerrar menú',
    openMenu: 'Abrir menú de navegación',
    userFallback: 'Usuario',
  },
  zh: {
    badge: '清单',
    title: '智能购物清单',
    signInToSync: '登录以同步云端',
    noItems: '清单暂无商品',
    inCart: (done, total) => `已购 ${done} / 共 ${total} 件`,
    nav: {
      list: '清单',
      categories: '分类目录',
      about: '关于',
      donation: '支持项目',
    },
    signOut: '退出',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    closeMenu: '关闭菜单',
    openMenu: '打开导航菜单',
    userFallback: '用户',
  },
};

export const Header: React.FC<HeaderProps> = ({
  page,
  setPage,
  itemCount,
  completedCount,
  theme,
  onToggleTheme,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = HEADER_COPY[language];

  const navItems: { id: PageType; label: string }[] = [
    { id: 'list', label: t.nav.list },
    { id: 'categories', label: t.nav.categories },
    { id: 'about', label: t.nav.about },
    { id: 'donation', label: t.nav.donation },
  ];

  const handleSelectPage = (nextPage: PageType) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
  };

  const userInitial = (user?.displayName || user?.email || 'U')
    .charAt(0)
    .toUpperCase();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-semibold text-xs tracking-tight shadow-xs flex-shrink-0">
            {t.badge}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none truncate">
              {t.title}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 truncate">
              {!user
                ? t.signInToSync
                : itemCount === 0
                  ? t.noItems
                  : t.inCart(completedCount, itemCount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Navegação Desktop */}
          {user && (
            <nav className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
              {navItems.map(({ id, label }) => {
                const isActive = page === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelectPage(id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Usuário Logado (Desktop) */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 pl-1">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || t.userFallback}
                  className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center text-xs font-semibold">
                  {userInitial}
                </div>
              )}
              <button
                type="button"
                onClick={onLogout}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title={t.signOut}
              >
                {t.signOut}
              </button>
            </div>
          )}

          {/* Seletor de Idioma Rápido */}
          <select
            aria-label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="h-8 px-2 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 transition-colors cursor-pointer"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.flag} {opt.shortLabel}
              </option>
            ))}
          </select>

          {/* Alternar Tema */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            title={theme === 'dark' ? t.lightMode : t.darkMode}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>

          {/* Botão Hambúrguer Mobile */}
          {user && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="sm:hidden p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {user && mobileMenuOpen && (
        <nav className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 space-y-1 animate-fade-in">
          {navItems.map(({ id, label }) => {
            const isActive = page === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectPage(id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span>{label}</span>
                {id === 'list' && itemCount > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || t.userFallback}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {userInitial}
                </div>
              )}
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                {user.displayName || user.email}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline cursor-pointer flex-shrink-0"
            >
              {t.signOut}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
