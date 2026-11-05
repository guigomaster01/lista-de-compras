import React from 'react';
import { useLanguage } from '../lib/i18n';
import type { Language } from '../types';

const ABOUT_COPY: Record<
  Language,
  {
    title: string;
    description: string;
    stackHeading: string;
    reactDesc: string;
    tailwindDesc: string;
  }
> = {
  pt: {
    title: 'Sobre o projeto',
    description:
      'Aplicação web direta para planejamento e controle rápido de compras. Os itens adicionados ficam salvos localmente no navegador ou sincronizados na nuvem com login Google, permitindo acompanhar o que falta pegar, comparar preços entre meses e compartilhar sua lista em tempo real.',
    stackHeading: 'Stack técnica',
    reactDesc:
      'Gerenciamento de estado, tipagem estática e sincronização em tempo real com Firebase.',
    tailwindDesc: 'Estilização utilitária compilada via plugin oficial do Vite.',
  },
  en: {
    title: 'About the project',
    description:
      'A fast, streamlined web application for planning and tracking your monthly grocery shopping. Items can be saved locally in your browser or synced to the cloud with Google Sign-In, allowing you to track what is left to pick up, compare prices across months, and share your list in real time.',
    stackHeading: 'Tech Stack',
    reactDesc:
      'State management, static typing, and real-time Firebase sync.',
    tailwindDesc: 'Utility-first styling compiled via the official Vite plugin.',
  },
  es: {
    title: 'Acerca del proyecto',
    description:
      'Aplicación web directa para la planificación y el control rápido de tus compras mensuales. Los productos se guardan localmente en el navegador o se sincronizan en la nube con Google, permitiendo controlar lo que falta en el carrito, comparar precios entre meses y compartir tu lista en tiempo real.',
    stackHeading: 'Stack técnico',
    reactDesc:
      'Gestión de estado, tipado estático y sincronización en tiempo real con Firebase.',
    tailwindDesc: 'Estilos utilitarios compilados mediante el plugin oficial de Vite.',
  },
  zh: {
    title: '关于本项目',
    description:
      '一款简洁高效的每月超市采购规划与预算控制 Web 应用。商品既可保存在本地浏览器中，也可通过 Google 登录实现云端同步，支持跨月历史价格对比、实时计算购物车总额，以及通过链接与家人实时共享清单。',
    stackHeading: '技术栈',
    reactDesc: '响应式状态管理、TypeScript 静态类型检查与 Firebase 实时云同步。',
    tailwindDesc: '基于 Vite 官方插件构建的原子化 CSS 样式系统。',
  },
};

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = ABOUT_COPY[language];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xs animate-fade-in">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {t.title}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {t.description}
      </p>

      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t.stackHeading}
        </h3>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">React 19 + TypeScript</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t.reactDesc}
            </dd>
          </div>
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800/70">
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">Tailwind CSS v4 + Vite</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t.tailwindDesc}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
