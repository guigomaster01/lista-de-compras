import React from 'react';
import { isFirebaseConfigured } from '../lib/firebase';
import { useLanguage, LANGUAGE_OPTIONS } from '../lib/i18n';
import type { Language } from '../types';
import { ProductIcon } from './icons/ProductIcon';

interface LoginScreenProps {
  onGoogleLogin: () => void;
  onContinueLocalDemo: () => void;
  isLoading: boolean;
  error: string | null;
}

interface LoginCopy {
  chooseLanguage: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  connecting: string;
  googleBtn: string;
  localBtn: string;
  cloudHint: string;
  localHint: string;
  previewHeading: string;
  previewItem1Name: string;
  previewItem1Cat: string;
  previewItem1Diff: string;
  previewItem1Price: string;
  previewItem2Name: string;
  previewItem2Cat: string;
  previewItem2Diff: string;
  previewItem2Price: string;
  whyTitle: string;
  whySubtitle: string;
  advantages: {
    title: string;
    description: string;
    badge: string;
  }[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  footerTitle: string;
  footerDescription: string;
  footerGoogleBtn: string;
  footerLocalBtn: string;
  footerBuildNowBtn: string;
}

const LOGIN_COPY: Record<Language, LoginCopy> = {
  pt: {
    chooseLanguage: 'Escolha o idioma:',
    heroBadge: '100% gratuito • Sem anúncios • Rápido no celular',
    heroTitle: 'Sua ida ao supermercado mais rápida, organizada e econômica.',
    heroDescription:
      'Monte sua lista em segundos, saiba se os preços subiram em relação ao mês passado, calcule o total do carrinho em tempo real e compartilhe a lista com a família pelo WhatsApp.',
    connecting: 'Conectando...',
    googleBtn: 'Entrar com Google e salvar na nuvem',
    localBtn: 'Começar agora sem cadastro',
    cloudHint:
      'Ao entrar com o Google você sincroniza suas listas entre celular e computador e pode compartilhar via link.',
    localHint:
      'Seus itens ficam salvos automaticamente no navegador deste aparelho, sem precisar criar conta.',
    previewHeading: 'Veja como fica sua lista no mercado',
    previewItem1Name: 'Azeite de Oliva Extra Virgem',
    previewItem1Cat: 'Mercearia',
    previewItem1Diff: '↓ R$ 3,50 mais barato que no mês passado (R$ 42,90)',
    previewItem1Price: 'R$ 39,40',
    previewItem2Name: 'Café Torrado e Moído 500g (2 un)',
    previewItem2Cat: 'Padaria & Matinais',
    previewItem2Diff: '↑ +R$ 1,20 por un. em relação ao mês anterior',
    previewItem2Price: 'R$ 37,80',
    whyTitle: 'Por que usar a Lista de Compras?',
    whySubtitle: 'Feita para usar com uma mão no mercado',
    advantages: [
      {
        title: 'Comparativo de preços mês a mês',
        description:
          'Veja na hora, direto no corredor do mercado, quanto você pagou no mesmo item no mês anterior e saiba se está caro ou barato.',
        badge: 'Economia real',
      },
      {
        title: 'Compartilhamento em tempo real',
        description:
          'Gere um link único da sua lista e envie no WhatsApp. Duas pessoas podem marcar itens no carrinho ao mesmo tempo.',
        badge: 'Em família',
      },
      {
        title: 'Importe a lista do mês passado com 1 clique',
        description:
          'Não perca tempo digitando tudo do zero. Reaproveite os produtos do mês anterior e atualize apenas os preços no mercado.',
        badge: 'Praticidade',
      },
      {
        title: 'Sem surpresas na hora de passar no caixa',
        description:
          'Acompanhe o valor exato do que já está no carrinho, o que falta pegar e o gráfico de gastos por categoria (Açougue, Limpeza, Hortifrúti).',
        badge: 'Controle total',
      },
    ],
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tire suas dúvidas sobre a ferramenta de lista de supermercado',
    faqs: [
      {
        question: 'A ferramenta de Lista de Compras é gratuita?',
        answer:
          'Sim! É 100% gratuita, sem anúncios e funciona direto no navegador do seu celular ou computador, sem precisar instalar aplicativo.',
      },
      {
        question: 'Preciso criar conta para montar minha lista de supermercado?',
        answer:
          'Não. Você pode clicar em "Começar agora sem cadastro" para salvar tudo localmente no seu navegador, ou entrar com sua conta Google se quiser sincronizar na nuvem e compartilhar com a família.',
      },
      {
        question: 'Como funciona o comparativo de preços mês a mês?',
        answer:
          'Sempre que você anota o preço de um produto na compra do mês, nos meses seguintes o sistema mostra automaticamente quanto você pagou da última vez e calcula em reais e percentual se o item subiu ou caiu.',
      },
      {
        question: 'Como compartilhar a lista de compras no WhatsApp?',
        answer:
          'No topo da sua lista mensal, basta clicar no botão "Compartilhar Lista" para copiar o link único e enviar no WhatsApp. Quem abrir o link vê os itens e pode marcar o que já colocou no carrinho em tempo real.',
      },
    ],
    footerTitle: 'Pronto para organizar a compra deste mês?',
    footerDescription:
      'Escolha itens do catálogo pronto por corredor ou crie sua própria lista personalizada em segundos.',
    footerGoogleBtn: 'Criar minha lista com Google',
    footerLocalBtn: 'Testar sem login',
    footerBuildNowBtn: 'Montar minha lista agora',
  },
  en: {
    chooseLanguage: 'Choose your language:',
    heroBadge: '100% Free • No Ads • Mobile-Friendly',
    heroTitle: 'Make your grocery trips faster, smarter, and on budget.',
    heroDescription:
      'Build your list in seconds, see if prices went up compared to last month, track your cart total in real time, and share your list with family.',
    connecting: 'Connecting...',
    googleBtn: 'Sign in with Google & sync to cloud',
    localBtn: 'Start now without account',
    cloudHint:
      'Sign in with Google to sync your lists across phone and computer and share via link.',
    localHint:
      'Your items are automatically saved in this device’s browser without needing an account.',
    previewHeading: 'See how your list looks in the store',
    previewItem1Name: 'Extra Virgin Olive Oil',
    previewItem1Cat: 'Pantry',
    previewItem1Diff: '↓ $1.50 cheaper than last month ($10.90)',
    previewItem1Price: '$9.40',
    previewItem2Name: 'Roasted Ground Coffee 500g (2x)',
    previewItem2Cat: 'Bakery & Breakfast',
    previewItem2Diff: '↑ +$0.80 per unit compared to last month',
    previewItem2Price: '$14.80',
    whyTitle: 'Why use Shopping List?',
    whySubtitle: 'Designed for one-handed use in the aisle',
    advantages: [
      {
        title: 'Month-over-month price comparison',
        description:
          'See right in the grocery aisle how much you paid for the exact same item last month and know immediately if it is cheaper or pricier.',
        badge: 'Real savings',
      },
      {
        title: 'Real-time family sharing',
        description:
          'Generate a unique link for your monthly list and send it via WhatsApp or iMessage. Two people can check off items in the cart at the same time.',
        badge: 'Family sync',
      },
      {
        title: '1-click import from last month',
        description:
          'Never type your recurring groceries from scratch again. Reuse last month’s items and only update the prices as you shop.',
        badge: 'Time saver',
      },
      {
        title: 'Zero surprises at checkout',
        description:
          'Track the exact total of what is already in your cart, what is still pending, and view a spending breakdown chart by aisle category.',
        badge: 'Full control',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our grocery list tool',
    faqs: [
      {
        question: 'Is this Grocery Shopping List tool completely free?',
        answer:
          'Yes! It is 100% free, ad-free, and works directly in your phone or computer browser without installing any app.',
      },
      {
        question: 'Do I need an account to create a shopping list?',
        answer:
          'No. You can click "Start now without account" to save your lists locally in your browser, or sign in with Google if you want cloud sync and real-time link sharing.',
      },
      {
        question: 'How does the month-over-month price comparison work?',
        answer:
          'Whenever you enter an item’s price in a monthly list, future months automatically display the last price you paid and calculate the exact dollar and percentage difference.',
      },
      {
        question: 'How do I share my grocery list with family?',
        answer:
          'Click the "Share List" button at the top of your monthly list to copy its unique URL and send it via WhatsApp, iMessage, or Telegram so others can check off items in real time.',
      },
    ],
    footerTitle: 'Ready to organize this month’s groceries?',
    footerDescription:
      'Pick items from our ready-made aisle catalog or create your own custom list in seconds.',
    footerGoogleBtn: 'Create my list with Google',
    footerLocalBtn: 'Try without login',
    footerBuildNowBtn: 'Build my list now',
  },
  es: {
    chooseLanguage: 'Elige tu idioma:',
    heroBadge: '100% Gratis • Sin anuncios • Rápido en el móvil',
    heroTitle: 'Tu compra en el supermercado más rápida, organizada y económica.',
    heroDescription:
      'Arma tu lista en segundos, descubre si los precios subieron respecto al mes pasado, calcula el total del carrito en tiempo real y comparte la lista con tu familia por WhatsApp.',
    connecting: 'Conectando...',
    googleBtn: 'Entrar con Google y guardar en la nube',
    localBtn: 'Empezar ahora sin registro',
    cloudHint:
      'Al iniciar sesión con Google sincronizas tus listas entre móvil y ordenador y puedes compartirlas mediante enlace.',
    localHint:
      'Tus productos se guardan automáticamente en el navegador de este dispositivo, sin necesidad de crear una cuenta.',
    previewHeading: 'Mira cómo se ve tu lista en el supermercado',
    previewItem1Name: 'Aceite de Oliva Virgen Extra',
    previewItem1Cat: 'Despensa',
    previewItem1Diff: '↓ $1,50 más barato que el mes pasado ($10,90)',
    previewItem1Price: '$9,40',
    previewItem2Name: 'Café Tostado y Molido 500g (2 uds)',
    previewItem2Cat: 'Panadería y Desayuno',
    previewItem2Diff: '↑ +$0,80 por ud. respecto al mes anterior',
    previewItem2Price: '$14,80',
    whyTitle: '¿Por qué usar Lista de Compras?',
    whySubtitle: 'Diseñada para usar con una sola mano en el súper',
    advantages: [
      {
        title: 'Comparación de precios mes a mes',
        description:
          'Mira al instante, en el pasillo del supermercado, cuánto pagaste por el mismo producto el mes pasado y sabe si está caro o barato.',
        badge: 'Ahorro real',
      },
      {
        title: 'Compartir en tiempo real',
        description:
          'Genera un enlace único de tu lista y envíalo por WhatsApp. Dos personas pueden marcar productos en el carrito al mismo tiempo.',
        badge: 'En familia',
      },
      {
        title: 'Importa la lista del mes pasado en 1 clic',
        description:
          'No pierdas tiempo escribiendo todo desde cero. Reutiliza los productos del mes anterior y actualiza solo los precios en la tienda.',
        badge: 'Practicidad',
      },
      {
        title: 'Sin sorpresas al llegar a la caja',
        description:
          'Sigue el importe exacto de lo que ya llevas en el carrito, lo que falta por tomar y el gráfico de gastos por categoría.',
        badge: 'Control total',
      },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Resuelve tus dudas sobre la herramienta de lista de supermercado',
    faqs: [
      {
        question: '¿La herramienta de Lista de Compras es gratuita?',
        answer:
          '¡Sí! Es 100% gratuita, sin anuncios y funciona directamente en el navegador de tu móvil u ordenador sin instalar aplicaciones.',
      },
      {
        question: '¿Necesito crear una cuenta para armar mi lista?',
        answer:
          'No. Puedes pulsar "Empezar ahora sin registro" para guardar todo en tu navegador, o iniciar sesión con Google para sincronizar en la nube y compartir con tu familia.',
      },
      {
        question: '¿Cómo funciona la comparación de precios mes a mes?',
        answer:
          'Cada vez que registras el precio de un producto en el mes, en los meses siguientes el sistema muestra automáticamente cuánto pagaste la última vez y calcula si subió o bajó.',
      },
      {
        question: '¿Cómo compartir la lista de compras por WhatsApp?',
        answer:
          'Solo pulsa el botón "Compartir Lista" en la barra del mes para copiar el enlace único y enviarlo por WhatsApp. Tu familia podrá abrirlo y marcar productos en tiempo real.',
      },
    ],
    footerTitle: '¿Listo para organizar la compra de este mes?',
    footerDescription:
      'Elige productos del catálogo listo por pasillos o crea tu propia lista personalizada en segundos.',
    footerGoogleBtn: 'Crear mi lista con Google',
    footerLocalBtn: 'Probar sin iniciar sesión',
    footerBuildNowBtn: 'Armar mi lista ahora',
  },
  zh: {
    chooseLanguage: '选择语言：',
    heroBadge: '100% 免费 • 无广告 • 手机端极速体验',
    heroTitle: '让您的超市采购更快捷、更有序、更省钱。',
    heroDescription:
      '几秒钟即可创建购物清单，实时对比上月价格涨跌，自动计算购物车总价，并通过链接与家人实时共享同步。',
    connecting: '正在连接...',
    googleBtn: '使用 Google 登录并云端同步',
    localBtn: '免注册立即开始使用',
    cloudHint:
      '使用 Google 登录即可在手机和电脑之间实时同步清单，并生成专属共享链接。',
    localHint:
      '无需注册账号，您的清单将自动保存在当前设备的浏览器中。',
    previewHeading: '超市购物时的清单效果预览',
    previewItem1Name: '特级初榨橄榄油',
    previewItem1Cat: '粮油干货',
    previewItem1Diff: '↓ 比上月便宜 ¥12.00（上月 ¥68.00）',
    previewItem1Price: '¥56.00',
    previewItem2Name: '烘焙研磨咖啡粉 500g (2件)',
    previewItem2Cat: '烘焙与早餐',
    previewItem2Diff: '↑ 单价较上月上涨 +¥3.50',
    previewItem2Price: '¥79.00',
    whyTitle: '为什么使用智能购物清单？',
    whySubtitle: '专为超市单手操作设计',
    advantages: [
      {
        title: '跨月历史价格智能对比',
        description:
          '在超市货架前即可直接查看上个月购买同款商品的价格，涨价降价一目了然。',
        badge: '真实省钱',
      },
      {
        title: '家人实时协同共享',
        description:
          '一键生成当月清单专属链接并发送给家人，多人可同时在超市勾选已购商品。',
        badge: '家庭同步',
      },
      {
        title: '一键导入上月常购清单',
        description:
          '无需每月从头输入常买日用品，一键复用上月商品，只需在超市更新当前价格。',
        badge: '省时高效',
      },
      {
        title: '结账前总价与分类一目了然',
        description:
          '实时统计已放入购物车与待购商品的金额，并自动生成各品类消费占比图表。',
        badge: '预算可控',
      },
    ],
    faqTitle: '常见问题解答 (FAQ)',
    faqSubtitle: '了解关于在线智能购物清单的更多信息',
    faqs: [
      {
        question: '这款超市购物清单工具完全免费吗？',
        answer:
          '是的！100% 免费且无任何广告，直接在手机或电脑浏览器中打开即可使用，无需下载安装应用。',
      },
      {
        question: '必须注册或登录账号才能使用吗？',
        answer:
          '不需要。您可以点击“免注册立即开始使用”将数据保存在本地浏览器中；也可以使用 Google 账号登录以开启跨设备云端同步和多人实时共享。',
      },
      {
        question: '跨月历史价格对比是如何工作的？',
        answer:
          '当您在某个月份记录了商品单价后，后续月份添加同名商品时会自动显示上次购买的价格，并在您输入新价格时自动计算涨跌幅。',
      },
      {
        question: '如何与家人实时共享同一个购物清单？',
        answer:
          '只需点击月份栏右侧的“共享清单”按钮即可复制专属链接并发送给家人，双方在超市可同时勾选商品并实时看到更新。',
      },
    ],
    footerTitle: '准备好规划本月的采购清单了吗？',
    footerDescription:
      '从按超市分区整理的商品目录中快速勾选，或几秒钟内自由添加您的专属商品。',
    footerGoogleBtn: '使用 Google 创建清单',
    footerLocalBtn: '免登录直接试用',
    footerBuildNowBtn: '立即创建我的清单',
  },
};

const ADVANTAGE_ICONS = [
  <svg
    key="chart"
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
  </svg>,
  <svg
    key="users"
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
  </svg>,
  <svg
    key="repeat"
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
  </svg>,
  <svg
    key="cart"
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
  </svg>,
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onGoogleLogin,
  onContinueLocalDemo,
  isLoading,
  error,
}) => {
  const { language, setLanguage } = useLanguage();
  const t = LOGIN_COPY[language];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Seletor de Idioma em Destaque na Tela de Login */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {t.chooseLanguage}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/90 p-1 rounded-lg border border-zinc-200/70 dark:border-zinc-700/70">
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                language === opt.code
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <span aria-hidden="true">{opt.flag}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero / CTA Principal */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/70 text-emerald-700 dark:text-emerald-300 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {t.heroBadge}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          {t.heroTitle}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {t.heroDescription}
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
              <span>{isLoading ? t.connecting : t.googleBtn}</span>
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
            <span>{t.localBtn}</span>
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
          {isFirebaseConfigured ? t.cloudHint : t.localHint}
        </p>

        {/* Prévia visual de como funciona no mercado */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            {t.previewHeading}
          </div>
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800 p-3.5 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-4 h-4 rounded border border-emerald-500 bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                  ✓
                </span>
                <ProductIcon
                  name={t.previewItem1Name}
                  category={t.previewItem1Cat}
                  size="md"
                  variant="badge"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {t.previewItem1Name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {t.previewItem1Cat}
                    </span>
                  </div>
                  <span className="inline-block mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {t.previewItem1Diff}
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums flex-shrink-0">
                {t.previewItem1Price}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 flex-shrink-0" />
                <ProductIcon
                  name={t.previewItem2Name}
                  category={t.previewItem2Cat}
                  size="md"
                  variant="badge"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {t.previewItem2Name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {t.previewItem2Cat}
                    </span>
                  </div>
                  <span className="inline-block mt-0.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    {t.previewItem2Diff}
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums flex-shrink-0">
                {t.previewItem2Price}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade de Vantagens */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t.whyTitle}
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t.whySubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.advantages.map((item, idx) => (
            <article
              key={item.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-2xs flex flex-col justify-between gap-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
                    {ADVANTAGE_ICONS[idx]}
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
            </article>
          ))}
        </div>
      </section>

      {/* Seção de FAQ para SEO */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <div>
          <h3
            id="faq-heading"
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {t.faqTitle}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="space-y-2.5">
          {t.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-3.5 shadow-2xs"
            >
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                <span>{faq.question}</span>
                <span className="text-zinc-400 group-open:rotate-180 transition-transform flex-shrink-0">
                  ▼
                </span>
              </summary>
              <p className="mt-2.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Final no rodapé */}
      <section className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1 max-w-md">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {t.footerTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {t.footerDescription}
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
                {isLoading ? t.connecting : t.footerGoogleBtn}
              </button>
              <button
                type="button"
                onClick={onContinueLocalDemo}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 rounded-xl transition-colors cursor-pointer text-center"
              >
                {t.footerLocalBtn}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onContinueLocalDemo}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-center"
            >
              {t.footerBuildNowBtn}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
