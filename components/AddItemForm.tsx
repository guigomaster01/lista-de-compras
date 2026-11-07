import React, { useState, useMemo } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { getProductCatalog } from '../data/catalog';
import { useLanguage } from '../lib/i18n';
import type { PreviousPriceInfo, Language } from '../types';

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number, price: number, category?: string) => void;
  previousPrices: Record<string, PreviousPriceInfo>;
}

const FORM_COPY: Record<
  Language,
  {
    customItem: string;
    placeholderItem: string;
    category: string;
    uncategorized: string;
    qty: string;
    unitPrice: string;
    pricePlaceholder: string;
    addBtn: string;
    lastPriceIn: string;
    upText: (diff: string, pct: string) => string;
    downText: (diff: string, pct: string) => string;
    samePrice: string;
  }
> = {
  pt: {
    customItem: 'Produto avulso',
    placeholderItem: 'Ex: Café, Azeite...',
    category: 'Categoria',
    uncategorized: 'Sem categoria',
    qty: 'Qtd.',
    unitPrice: 'Valor unit.',
    pricePlaceholder: '0,00',
    addBtn: 'Adicionar',
    lastPriceIn: 'Último preço registrado em ',
    upText: (diff, pct) => `↑ Subiu +${diff} (+${pct})`,
    downText: (diff, pct) => `↓ Caiu ${diff} (${pct})`,
    samePrice: '= Mesmo preço do mês anterior',
  },
  en: {
    customItem: 'Custom item',
    placeholderItem: 'e.g. Coffee, Olive oil...',
    category: 'Category',
    uncategorized: 'Uncategorized',
    qty: 'Qty.',
    unitPrice: 'Unit price',
    pricePlaceholder: '0.00',
    addBtn: 'Add',
    lastPriceIn: 'Last price recorded in ',
    upText: (diff, pct) => `↑ Up +${diff} (+${pct})`,
    downText: (diff, pct) => `↓ Down ${diff} (${pct})`,
    samePrice: '= Same price as last month',
  },
  es: {
    customItem: 'Producto personalizado',
    placeholderItem: 'Ej: Café, Aceite...',
    category: 'Categoría',
    uncategorized: 'Sin categoría',
    qty: 'Cant.',
    unitPrice: 'Precio unit.',
    pricePlaceholder: '0,00',
    addBtn: 'Añadir',
    lastPriceIn: 'Último precio registrado en ',
    upText: (diff, pct) => `↑ Subió +${diff} (+${pct})`,
    downText: (diff, pct) => `↓ Bajó ${diff} (${pct})`,
    samePrice: '= Mismo precio que el mes anterior',
  },
  zh: {
    customItem: '自定义商品',
    placeholderItem: '例如：咖啡、橄榄油...',
    category: '分类',
    uncategorized: '未分类',
    qty: '数量',
    unitPrice: '单价',
    pricePlaceholder: '0.00',
    addBtn: '添加',
    lastPriceIn: '上次记录价格（',
    upText: (diff, pct) => `↑ 上涨 +${diff} (+${pct})`,
    downText: (diff, pct) => `↓ 下降 ${diff} (${pct})`,
    samePrice: '= 与上月价格相同',
  },
};

export const AddItemForm: React.FC<AddItemFormProps> = ({
  onAddItem,
  previousPrices,
}) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  const { language, formatCurrency, formatShortMonth, formatPercent, currencySymbol } =
    useLanguage();
  const t = FORM_COPY[language];

  const categoryOptions = useMemo(
    () =>
      getProductCatalog(language).map((c) =>
        c.title.replace(/^\d+\.\s*/, '')
      ),
    [language]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemName.trim()) {
      const numQuantity = Math.max(1, parseInt(quantity, 10) || 1);
      const numPrice = Math.max(0, parseFloat(price.replace(',', '.')) || 0);
      onAddItem(
        itemName.trim(),
        numQuantity,
        numPrice,
        category || undefined
      );
      setItemName('');
      setQuantity('1');
      setPrice('');
    }
  };

  const normalizedName = itemName.trim().toLowerCase();
  const prevInfo = normalizedName ? previousPrices[normalizedName] : undefined;
  const typedPrice = parseFloat(price.replace(',', '.')) || 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-2xs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        <div className="sm:col-span-4">
          <label
            htmlFor="item-name"
            className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
          >
            {t.customItem}
          </label>
          <input
            id="item-name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder={t.placeholderItem}
            className="w-full h-10 sm:h-9 px-3 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="item-category"
            className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
          >
            {t.category}
          </label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-10 sm:h-9 px-2.5 text-base sm:text-xs text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          >
            <option value="">{t.uncategorized}</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:col-span-3">
          <div>
            <label
              htmlFor="item-quantity"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
            >
              {t.qty}
            </label>
            <input
              id="item-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full h-10 sm:h-9 px-2.5 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors tabular-nums"
            />
          </div>

          <div>
            <label
              htmlFor="item-price"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
            >
              {t.unitPrice}
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 dark:text-zinc-500 pointer-events-none">
                {currencySymbol}
              </span>
              <input
                id="item-price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={t.pricePlaceholder}
                inputMode="decimal"
                className="w-full h-10 sm:h-9 pl-7 pr-2 text-base sm:text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors tabular-nums"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={!itemName.trim()}
            className="w-full h-10 sm:h-9 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span>{t.addBtn}</span>
          </button>
        </div>
      </div>

      {/* Comparativo imediato enquanto digita no formulário */}
      {prevInfo && (
        <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {t.lastPriceIn}
            <strong>{formatShortMonth(prevInfo.monthKey)}</strong>
            {language === 'zh' ? '）：' : ': '}
            <strong className="tabular-nums">{formatCurrency(prevInfo.price)}</strong>
          </span>

          {typedPrice > 0 && (
            <span
              className={`font-medium tabular-nums ${
                typedPrice - prevInfo.price > 0.004
                  ? 'text-red-600 dark:text-red-400'
                  : typedPrice - prevInfo.price < -0.004
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {typedPrice - prevInfo.price > 0.004 &&
                t.upText(
                  formatCurrency(typedPrice - prevInfo.price),
                  formatPercent(((typedPrice - prevInfo.price) / prevInfo.price) * 100)
                )}
              {typedPrice - prevInfo.price < -0.004 &&
                t.downText(
                  formatCurrency(typedPrice - prevInfo.price),
                  formatPercent(((typedPrice - prevInfo.price) / prevInfo.price) * 100)
                )}
              {Math.abs(typedPrice - prevInfo.price) <= 0.004 && t.samePrice}
            </span>
          )}
        </div>
      )}
    </form>
  );
};
