import React, { useState, useMemo } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { getProductCatalog } from '../data/catalog';
import { useLanguage } from '../lib/i18n';
import type { PreviousPriceInfo } from '../types';

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number, price: number, category?: string) => void;
  previousPrices: Record<string, PreviousPriceInfo>;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  onAddItem,
  previousPrices,
}) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  const { language, formatCurrency, formatShortMonth, currencySymbol } = useLanguage();
  const isEn = language === 'en';

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
            {isEn ? 'Custom item' : 'Produto avulso'}
          </label>
          <input
            id="item-name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder={isEn ? 'e.g. Coffee, Olive oil...' : 'Ex: Café, Azeite...'}
            className="w-full h-9 px-3 text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="item-category"
            className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
          >
            {isEn ? 'Category' : 'Categoria'}
          </label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-9 px-2.5 text-xs text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          >
            <option value="">{isEn ? 'Uncategorized' : 'Sem categoria'}</option>
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
              {isEn ? 'Qty.' : 'Qtd.'}
            </label>
            <input
              id="item-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full h-9 px-2.5 text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors tabular-nums"
            />
          </div>

          <div>
            <label
              htmlFor="item-price"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5"
            >
              {isEn ? 'Unit price' : 'Valor unit.'}
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
                placeholder={isEn ? '0.00' : '0,00'}
                inputMode="decimal"
                className="w-full h-9 pl-7 pr-2 text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors tabular-nums"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={!itemName.trim()}
            className="w-full h-9 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span>{isEn ? 'Add' : 'Adicionar'}</span>
          </button>
        </div>
      </div>

      {/* Comparativo imediato enquanto digita no formulário */}
      {prevInfo && (
        <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Last price recorded in ' : 'Último preço registrado em '}
            <strong>{formatShortMonth(prevInfo.monthKey)}</strong>:{' '}
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
                (isEn
                  ? `↑ Up +${formatCurrency(typedPrice - prevInfo.price)} (+${(
                      ((typedPrice - prevInfo.price) / prevInfo.price) *
                      100
                    ).toFixed(1)}%)`
                  : `↑ Subiu +${formatCurrency(typedPrice - prevInfo.price)} (+${(
                      ((typedPrice - prevInfo.price) / prevInfo.price) *
                      100
                    )
                      .toFixed(1)
                      .replace('.', ',')}%)`)}
              {typedPrice - prevInfo.price < -0.004 &&
                (isEn
                  ? `↓ Down ${formatCurrency(typedPrice - prevInfo.price)} (${(
                      ((typedPrice - prevInfo.price) / prevInfo.price) *
                      100
                    ).toFixed(1)}%)`
                  : `↓ Caiu ${formatCurrency(typedPrice - prevInfo.price)} (${(
                      ((typedPrice - prevInfo.price) / prevInfo.price) *
                      100
                    )
                      .toFixed(1)
                      .replace('.', ',')}%)`)}
              {Math.abs(typedPrice - prevInfo.price) <= 0.004 &&
                (isEn ? '= Same price as last month' : '= Mesmo preço do mês anterior')}
            </span>
          )}
        </div>
      )}
    </form>
  );
};
