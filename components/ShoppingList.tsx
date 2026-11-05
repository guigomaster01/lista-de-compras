import React, { useState, useEffect } from 'react';
import type { ShoppingItem, PreviousPriceInfo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CategoryPieChart } from './CategoryPieChart';
import { useLanguage } from '../lib/i18n';

export type SortOption = 'default' | 'category' | 'name';

interface ShoppingListProps {
  items: ShoppingItem[];
  previousPrices: Record<string, PreviousPriceInfo>;
  hasPreviousMonthItems: boolean;
  onImportPreviousMonth: () => void;
  onToggleItem: (id: number) => void;
  onUpdateItem: (id: number, quantity: number, price: number) => void;
  onRemoveItem: (id: number) => void;
  onClearList: () => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  totalPrice: number;
  completedTotal: number;
  exitingItemIds: number[];
  onGoToCategories: () => void;
}

const PriceComparisonBadge: React.FC<{
  currentPrice: number;
  prevInfo?: PreviousPriceInfo;
}> = ({ currentPrice, prevInfo }) => {
  const { language, formatCurrency, formatShortMonth } = useLanguage();
  const isEn = language === 'en';

  if (!prevInfo || prevInfo.price <= 0) return null;

  const shortMonth = formatShortMonth(prevInfo.monthKey);

  // Se ainda não digitou o preço deste mês, mostra o último preço pago como referência
  if (currentPrice <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 tabular-nums">
        <span>
          {isEn
            ? `Last (${shortMonth}): ${formatCurrency(prevInfo.price)}`
            : `Último (${shortMonth}): ${formatCurrency(prevInfo.price)}`}
        </span>
      </span>
    );
  }

  const diff = currentPrice - prevInfo.price;
  const pct = (diff / prevInfo.price) * 100;
  const formattedPct = isEn
    ? pct.toFixed(1)
    : pct.toFixed(1).replace('.', ',');

  if (diff > 0.004) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/70 dark:border-red-900/60 tabular-nums"
        title={
          isEn
            ? `In ${shortMonth} it cost ${formatCurrency(prevInfo.price)}`
            : `Em ${shortMonth} custava ${formatCurrency(prevInfo.price)}`
        }
      >
        <span aria-hidden="true">&uarr;</span>
        <span>
          +{formatCurrency(diff)} (+{formattedPct}%) vs {shortMonth} ({formatCurrency(prevInfo.price)})
        </span>
      </span>
    );
  }

  if (diff < -0.004) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/60 tabular-nums"
        title={
          isEn
            ? `In ${shortMonth} it cost ${formatCurrency(prevInfo.price)}`
            : `Em ${shortMonth} custava ${formatCurrency(prevInfo.price)}`
        }
      >
        <span aria-hidden="true">&darr;</span>
        <span>
          {formatCurrency(diff)} ({formattedPct}%) vs {shortMonth} ({formatCurrency(prevInfo.price)})
        </span>
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums"
      title={
        isEn
          ? `In ${shortMonth} it cost ${formatCurrency(prevInfo.price)}`
          : `Em ${shortMonth} custava ${formatCurrency(prevInfo.price)}`
      }
    >
      <span>
        {isEn
          ? `= Same price as ${shortMonth} (${formatCurrency(prevInfo.price)})`
          : `= Mesmo valor de ${shortMonth} (${formatCurrency(prevInfo.price)})`}
      </span>
    </span>
  );
};

const ShoppingListItem: React.FC<{
  item: ShoppingItem;
  prevInfo?: PreviousPriceInfo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, quantity: number, price: number) => void;
  onRemove: (id: number) => void;
  isExiting: boolean;
}> = ({ item, prevInfo, onToggle, onUpdate, onRemove, isExiting }) => {
  const { language, formatCurrency, currencySymbol } = useLanguage();
  const isEn = language === 'en';

  const animationClass = isExiting ? 'animate-fade-out-scale' : 'animate-fade-in-scale';
  const subtotal = item.quantity * item.price;

  const formatInputPrice = (val: number) => {
    if (val <= 0) return '';
    return isEn ? val.toFixed(2) : val.toFixed(2).replace('.', ',');
  };

  const [priceInput, setPriceInput] = useState(() => formatInputPrice(item.price));
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  useEffect(() => {
    if (!isEditingPrice) {
      setPriceInput(
        item.price > 0
          ? isEn
            ? item.price.toFixed(2)
            : item.price.toFixed(2).replace('.', ',')
          : ''
      );
    }
  }, [item.price, isEditingPrice, isEn]);

  const handlePriceChange = (val: string) => {
    setPriceInput(val);
    const parsed = parseFloat(val.replace(',', '.'));
    onUpdate(item.id, item.quantity, Number.isNaN(parsed) ? 0 : Math.max(0, parsed));
  };

  const handleQuantityChange = (val: string) => {
    const parsed = parseInt(val, 10);
    const nextQty = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
    onUpdate(item.id, nextQty, item.price);
  };

  return (
    <li
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors ${animationClass}`}
    >
      <label className="flex items-start sm:items-center gap-3.5 flex-grow cursor-pointer select-none min-w-0">
        <span className="relative flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
            className="peer sr-only"
          />
          <span className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100 peer-checked:border-zinc-900 dark:peer-checked:border-zinc-100 peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-500 transition-colors flex items-center justify-center">
            {item.completed && (
              <svg
                className="w-3 h-3 text-white dark:text-zinc-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </span>

        <div className="min-w-0 flex-grow">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium transition-colors ${
                item.completed
                  ? 'line-through text-zinc-400 dark:text-zinc-500'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {item.name}
            </span>
            {item.category && (
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {item.category}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.price === 0
                ? isEn
                  ? 'Enter qty & price when you find it in the store'
                  : 'Informe qtd. e valor ao encontrar no mercado'
                : `Subtotal: ${formatCurrency(subtotal)}`}
            </span>
            <PriceComparisonBadge currentPrice={item.price} prevInfo={prevInfo} />
          </div>
        </div>
      </label>

      <div className="flex items-center justify-between sm:justify-end gap-2 pl-7 sm:pl-0 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <label htmlFor={`qty-${item.id}`} className="sr-only">
              {isEn ? `Quantity of ${item.name}` : `Quantidade de ${item.name}`}
            </label>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1.5">
              {isEn ? 'Qty' : 'Qtd'}
            </span>
            <input
              id={`qty-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-14 h-8 px-2 text-xs text-center font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 tabular-nums"
            />
          </div>

          <div className="relative flex items-center">
            <label htmlFor={`price-${item.id}`} className="sr-only">
              {isEn ? `Unit price of ${item.name}` : `Preço unitário de ${item.name}`}
            </label>
            <span className="absolute left-2.5 text-xs text-zinc-400 dark:text-zinc-500 pointer-events-none">
              {currencySymbol}
            </span>
            <input
              id={`price-${item.id}`}
              type="text"
              inputMode="decimal"
              placeholder={isEn ? '0.00' : '0,00'}
              value={priceInput}
              onFocus={() => setIsEditingPrice(true)}
              onBlur={() => setIsEditingPrice(false)}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-24 h-8 pl-7 pr-2 text-xs font-medium text-right text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 tabular-nums"
            />
          </div>
        </div>

        <div className="w-20 text-right hidden md:block">
          <span
            className={`text-xs font-semibold tabular-nums ${
              item.completed
                ? 'text-zinc-400 dark:text-zinc-600 line-through'
                : 'text-zinc-900 dark:text-zinc-100'
            }`}
          >
            {formatCurrency(subtotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
          aria-label={isEn ? `Remove ${item.name}` : `Remover ${item.name}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  previousPrices,
  hasPreviousMonthItems,
  onImportPreviousMonth,
  onToggleItem,
  onUpdateItem,
  onRemoveItem,
  onClearList,
  sortBy,
  onSortChange,
  totalPrice,
  completedTotal,
  exitingItemIds,
  onGoToCategories,
}) => {
  const { language, formatCurrency } = useLanguage();
  const isEn = language === 'en';

  if (items.length === 0 && exitingItemIds.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-12 px-4 text-center">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {isEn
            ? 'Your shopping list for this month is empty'
            : 'Sua lista de compras deste mês está vazia'}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 max-w-md mx-auto">
          {isEn
            ? 'Pick ready-made items from the Categories tab, import last month’s items, or add a custom item above.'
            : 'Escolha produtos prontos na aba de categorias, importe os produtos do mês anterior ou adicione um item avulso acima.'}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onGoToCategories}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>{isEn ? 'Build list by Categories' : 'Montar lista por Categorias'}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>

          {hasPreviousMonthItems && (
            <button
              type="button"
              onClick={onImportPreviousMonth}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>{isEn ? 'Repeat last month’s items' : 'Repetir itens do mês anterior'}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
            {isEn ? 'Remaining (Pending)' : 'Falta pegar (Pendente)'}
          </span>
          <span className="mt-1 block text-base font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
            {isEn ? 'In cart (Checked)' : 'No carrinho (Marcados)'}
          </span>
          <span className="mt-1 block text-base font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {formatCurrency(completedTotal)}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-zinc-900 dark:bg-zinc-100 border border-zinc-900 dark:border-zinc-100 rounded-xl p-3.5">
          <span className="block text-xs text-zinc-400 dark:text-zinc-600">
            {isEn ? 'Total purchase' : 'Total da compra'}
          </span>
          <span className="mt-1 block text-base font-semibold text-white dark:text-zinc-900 tabular-nums">
            {formatCurrency(totalPrice + completedTotal)}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-4 py-2.5 bg-zinc-50/70 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              {isEn ? 'Sort by:' : 'Ordenar:'}
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10"
            >
              <option value="category">{isEn ? 'By Category' : 'Por Categoria'}</option>
              <option value="default">{isEn ? 'Date Added' : 'Ordem de inclusão'}</option>
              <option value="name">{isEn ? 'Alphabetical (A-Z)' : 'Alfabética (A-Z)'}</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onGoToCategories}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              {isEn ? '+ Categories' : '+ Categorias'}
            </button>
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearList}
                className="text-xs font-medium text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                {isEn ? 'Clear list' : 'Limpar lista'}
              </button>
            )}
          </div>
        </div>

        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map((item) => (
            <ShoppingListItem
              key={item.id}
              item={item}
              prevInfo={previousPrices[item.name.trim().toLowerCase()]}
              onToggle={onToggleItem}
              onUpdate={onUpdateItem}
              onRemove={onRemoveItem}
              isExiting={exitingItemIds.includes(item.id)}
            />
          ))}
        </ul>
      </div>

      <CategoryPieChart items={items} />
    </div>
  );
};
