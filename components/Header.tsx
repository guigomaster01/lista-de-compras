import React, { useState } from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { useLanguage } from '../lib/i18n';
import type { PageType } from '../types';

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
  const isEn = language === 'en';

  const navItems: { id: PageType; label: string }[] = [
    { id: 'list', label: isEn ? 'List' : 'Lista' },
    { id: 'categories', label: isEn ? 'Categories' : 'Categorias' },
    { id: 'about', label: isEn ? 'About' : 'Sobre' },
    { id: 'donation', label: isEn ? 'Support' : 'Apoiar' },
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
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-semibold text-sm tracking-tight shadow-xs flex-shrink-0">
            {isEn ? 'SL' : 'LC'}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none truncate">
              {isEn ? 'Shopping List' : 'Lista de Compras'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 truncate">
              {!user
                ? isEn
                  ? 'Sign in to sync'
                  : 'Faça login para sincronizar'
                : itemCount === 0
                  ? isEn
                    ? 'No items in the list'
                    : 'Nenhum item na lista'
                  : isEn
                    ? `${completedCount} of ${itemCount} in cart`
                    : `${completedCount} de ${itemCount} no carrinho`}
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
                  alt={user.displayName || (isEn ? 'User' : 'Usuário')}
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
                title={isEn ? 'Sign out' : 'Sair da conta'}
              >
                {isEn ? 'Sign out' : 'Sair'}
              </button>
            </div>
          )}

          {/* Alternar Idioma Rápido */}
          <button
            type="button"
            onClick={() => setLanguage(isEn ? 'pt' : 'en')}
            className="h-8 px-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isEn ? 'Mudar para Português (BR)' : 'Switch to English (EN)'}
          >
            {isEn ? 'EN' : 'PT'}
          </button>

          {/* Alternar Tema */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={
              theme === 'dark'
                ? isEn
                  ? 'Enable light mode'
                  : 'Ativar modo claro'
                : isEn
                  ? 'Enable dark mode'
                  : 'Ativar modo escuro'
            }
            title={
              theme === 'dark'
                ? isEn
                  ? 'Light mode'
                  : 'Modo claro'
                : isEn
                  ? 'Dark mode'
                  : 'Modo escuro'
            }
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
              aria-label={
                mobileMenuOpen
                  ? isEn
                    ? 'Close menu'
                    : 'Fechar menu'
                  : isEn
                    ? 'Open navigation menu'
                    : 'Abrir menu de navegação'
              }
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
                  alt={user.displayName || (isEn ? 'User' : 'Usuário')}
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
              {isEn ? 'Sign out' : 'Sair'}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
