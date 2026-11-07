import React, { useState, useEffect } from 'react';
import type { ShoppingItem, PreviousPriceInfo, Language } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { ProductIcon } from './icons/ProductIcon';
import { CategoryPieChart } from './CategoryPieChart';
import { useLanguage } from '../lib/i18n';

export type SortOption = 'default' | 'category' | 'name';

interface ShoppingListProps {
  items: ShoppingItem[];
  previousPrices: Record<string, PreviousPriceInfo>;
  hasPreviousMonthItems: boolean;
  onOpenImportModal: () => void;
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

const LIST_COPY: Record<
  Language,
  {
    lastBadge: (month: string, price: string) => string;
    costInMonth: (month: string, price: string) => string;
    samePriceAs: (month: string, price: string) => string;
    enterAtStore: string;
    subtotal: string;
    qtyOf: (name: string) => string;
    qtyShort: string;
    unitPriceOf: (name: string) => string;
    pricePlaceholder: string;
    removeAria: (name: string) => string;
    emptyTitle: string;
    emptyDesc: string;
    buildByCategories: string;
    repeatLastMonth: string;
    remainingPending: string;
    inCartChecked: string;
    totalPurchase: string;
    sortByLabel: string;
    sortCategory: string;
    sortDefault: string;
    sortName: string;
    importPreviousShort: string;
    plusCategories: string;
    clearList: string;
  }
> = {
  pt: {
    lastBadge: (month, price) => `Último (${month}): ${price}`,
    costInMonth: (month, price) => `Em ${month} custava ${price}`,
    samePriceAs: (month, price) => `= Mesmo valor de ${month} (${price})`,
    enterAtStore: 'Informe qtd. e valor ao encontrar no mercado',
    subtotal: 'Subtotal',
    qtyOf: (name) => `Quantidade de ${name}`,
    qtyShort: 'Qtd',
    unitPriceOf: (name) => `Preço unitário de ${name}`,
    pricePlaceholder: '0,00',
    removeAria: (name) => `Remover ${name}`,
    emptyTitle: 'Sua lista de compras deste mês está vazia',
    emptyDesc:
    'Escolha produtos prontos na aba de categorias, importe produtos do mês anterior ou adicione um item avulso acima.',
    buildByCategories: 'Montar lista por Categorias',
    repeatLastMonth: 'Importar itens do mês anterior',
    remainingPending: 'Falta pegar (Pendente)',
    inCartChecked: 'No carrinho (Marcados)',
    totalPurchase: 'Total da compra',
    sortByLabel: 'Ordenar:',
    sortCategory: 'Por Categoria',
    sortDefault: 'Ordem de inclusão',
    sortName: 'Alfabética (A-Z)',
    importPreviousShort: 'Importar mês anterior',
    plusCategories: '+ Categorias',
    clearList: 'Limpar lista',
  },
  en: {
    lastBadge: (month, price) => `Last (${month}): ${price}`,
    costInMonth: (month, price) => `In ${month} it cost ${price}`,
    samePriceAs: (month, price) => `= Same price as ${month} (${price})`,
    enterAtStore: 'Enter qty & price when you find it in the store',
    subtotal: 'Subtotal',
    qtyOf: (name) => `Quantity of ${name}`,
    qtyShort: 'Qty',
    unitPriceOf: (name) => `Unit price of ${name}`,
    pricePlaceholder: '0.00',
    removeAria: (name) => `Remove ${name}`,
    emptyTitle: 'Your shopping list for this month is empty',
    emptyDesc:
    'Pick ready-made items from the Categories tab, import items from a previous month, or add a custom item above.',
    buildByCategories: 'Build list by Categories',
    repeatLastMonth: 'Import from previous month',
    remainingPending: 'Remaining (Pending)',
    inCartChecked: 'In cart (Checked)',
    totalPurchase: 'Total purchase',
    sortByLabel: 'Sort by:',
    sortCategory: 'By Category',
    sortDefault: 'Date Added',
    sortName: 'Alphabetical (A-Z)',
    importPreviousShort: 'Import previous month',
    plusCategories: '+ Categories',
    clearList: 'Clear list',
  },
  es: {
    lastBadge: (month, price) => `Último (${month}): ${price}`,
    costInMonth: (month, price) => `En ${month} costaba ${price}`,
    samePriceAs: (month, price) => `= Mismo precio que en ${month} (${price})`,
    enterAtStore: 'Indica cant. y precio al encontrarlo en la tienda',
    subtotal: 'Subtotal',
    qtyOf: (name) => `Cantidad de ${name}`,
    qtyShort: 'Cant',
    unitPriceOf: (name) => `Precio unitario de ${name}`,
    pricePlaceholder: '0,00',
    removeAria: (name) => `Eliminar ${name}`,
    emptyTitle: 'Tu lista de compras de este mes está vacía',
    emptyDesc:
    'Elige productos listos en la pestaña de categorías, importa productos del mes anterior o añade un artículo arriba.',
    buildByCategories: 'Armar lista por Categorías',
    repeatLastMonth: 'Importar del mes anterior',
    remainingPending: 'Por comprar (Pendiente)',
    inCartChecked: 'En el carrito (Marcados)',
    totalPurchase: 'Total de la compra',
    sortByLabel: 'Ordenar:',
    sortCategory: 'Por Categoría',
    sortDefault: 'Orden de inclusión',
    sortName: 'Alfabético (A-Z)',
    importPreviousShort: 'Importar mes anterior',
    plusCategories: '+ Categorías',
    clearList: 'Vaciar lista',
  },
  zh: {
    lastBadge: (month, price) => `上次 (${month})：${price}`,
    costInMonth: (month, price) => `${month} 价格为 ${price}`,
    samePriceAs: (month, price) => `= 与 ${month} 价格相同 (${price})`,
    enterAtStore: '在超市找到商品后输入数量与单价',
    subtotal: '小计',
    qtyOf: (name) => `${name} 的数量`,
    qtyShort: '数量',
    unitPriceOf: (name) => `${name} 的单价`,
    pricePlaceholder: '0.00',
    removeAria: (name) => `移除 ${name}`,
    emptyTitle: '您本月的购物清单为空',
    emptyDesc:
    '可在“分类目录”中快速勾选常用商品、从上月清单中选择导入，或在上方添加自定义商品。',
    buildByCategories: '按分类目录选购',
    repeatLastMonth: '从历史清单导入商品',
    remainingPending: '待购合计（未勾选）',
    inCartChecked: '购物车内（已勾选）',
    totalPurchase: '预计总金额',
    sortByLabel: '排序：',
    sortCategory: '按商品分类',
    sortDefault: '按添加顺序',
    sortName: '按名称排序 (A-Z)',
    importPreviousShort: '导入上月商品',
    plusCategories: '+ 分类目录',
    clearList: '清空清单',
  },
};

const PriceComparisonBadge: React.FC<{
  currentPrice: number;
  prevInfo?: PreviousPriceInfo;
}> = ({ currentPrice, prevInfo }) => {
  const { language, formatCurrency, formatShortMonth, formatPercent } = useLanguage();
  const t = LIST_COPY[language];

  if (!prevInfo || prevInfo.price <= 0) return null;

  const shortMonth = formatShortMonth(prevInfo.monthKey);
  const formattedPrevPrice = formatCurrency(prevInfo.price);

  if (currentPrice <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 tabular-nums">
        <span>{t.lastBadge(shortMonth, formattedPrevPrice)}</span>
      </span>
    );
  }

  const diff = currentPrice - prevInfo.price;
  const pct = (diff / prevInfo.price) * 100;
  const formattedPct = formatPercent(pct);

  if (diff > 0.004) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/70 dark:border-red-900/60 tabular-nums"
        title={t.costInMonth(shortMonth, formattedPrevPrice)}
      >
        <span aria-hidden="true">&uarr;</span>
        <span>
          +{formatCurrency(diff)} (+{formattedPct}) vs {shortMonth} ({formattedPrevPrice})
        </span>
      </span>
    );
  }

  if (diff < -0.004) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/60 tabular-nums"
        title={t.costInMonth(shortMonth, formattedPrevPrice)}
      >
        <span aria-hidden="true">&darr;</span>
        <span>
          {formatCurrency(diff)} ({formattedPct}) vs {shortMonth} ({formattedPrevPrice})
        </span>
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 tabular-nums"
      title={t.costInMonth(shortMonth, formattedPrevPrice)}
    >
      <span>{t.samePriceAs(shortMonth, formattedPrevPrice)}</span>
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
  const t = LIST_COPY[language];
  const useDotDecimal = language === 'en' || language === 'zh';

  const animationClass = isExiting ? 'animate-fade-out-scale' : 'animate-fade-in-scale';
  const subtotal = item.quantity * item.price;

  const formatInputPrice = (val: number) => {
    if (val <= 0) return '';
    return useDotDecimal ? val.toFixed(2) : val.toFixed(2).replace('.', ',');
  };

  const [priceInput, setPriceInput] = useState(() => formatInputPrice(item.price));
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  useEffect(() => {
    if (!isEditingPrice) {
      setPriceInput(
        item.price > 0
          ? useDotDecimal
            ? item.price.toFixed(2)
            : item.price.toFixed(2).replace('.', ',')
          : ''
      );
    }
  }, [item.price, isEditingPrice, useDotDecimal]);

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
      <label className="flex items-start sm:items-center gap-3 flex-grow cursor-pointer select-none min-w-0">
        <span className="relative flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
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

        <ProductIcon
          name={item.name}
          category={item.category}
          size="md"
          variant="badge"
          className={item.completed ? 'opacity-50 grayscale' : ''}
        />

        <div className="min-w-0 flex-grow">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium transition-colors ${item.completed
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
                ? t.enterAtStore
                : `${t.subtotal}: ${formatCurrency(subtotal)}`}
            </span>
            <PriceComparisonBadge currentPrice={item.price} prevInfo={prevInfo} />
          </div>
        </div>
      </label>

      <div className="flex items-center justify-between sm:justify-end gap-2 pl-7 sm:pl-0 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center">
            <label htmlFor={`qty-${item.id}`} className="sr-only">
              {t.qtyOf(item.name)}
            </label>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1.5">
              {t.qtyShort}
            </span>
            <input
              id={`qty-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-14 h-9 sm:h-8 px-1.5 text-base sm:text-xs text-center font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 tabular-nums"
            />
          </div>

          <div className="relative flex items-center">
            <label htmlFor={`price-${item.id}`} className="sr-only">
              {t.unitPriceOf(item.name)}
            </label>
            <span className="absolute left-2.5 text-xs text-zinc-400 dark:text-zinc-500 pointer-events-none">
              {currencySymbol}
            </span>
            <input
              id={`price-${item.id}`}
              type="text"
              inputMode="decimal"
              placeholder={t.pricePlaceholder}
              value={priceInput}
              onFocus={() => setIsEditingPrice(true)}
              onBlur={() => setIsEditingPrice(false)}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-28 sm:w-24 h-9 sm:h-8 pl-7 pr-2 text-base sm:text-xs font-medium text-right text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 tabular-nums"
            />
          </div>
        </div>

        <div className="w-20 text-right hidden md:block">
          <span
            className={`text-xs font-semibold tabular-nums ${item.completed
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
          aria-label={t.removeAria(item.name)}
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
  onOpenImportModal,
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
  const t = LIST_COPY[language];

  if (items.length === 0 && exitingItemIds.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-12 px-4 text-center">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t.emptyTitle}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 max-w-md mx-auto">
          {t.emptyDesc}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onGoToCategories}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>{t.buildByCategories}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>

          {hasPreviousMonthItems && (
            <button
              type="button"
              onClick={onOpenImportModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>{t.repeatLastMonth}</span>
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
            {t.remainingPending}
          </span>
          <span className="mt-1 block text-base font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5">
          <span className="block text-xs text-zinc-500 dark:text-zinc-400">
            {t.inCartChecked}
          </span>
          <span className="mt-1 block text-base font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {formatCurrency(completedTotal)}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-zinc-900 dark:bg-zinc-100 border border-zinc-900 dark:border-zinc-100 rounded-xl p-3.5">
          <span className="block text-xs text-zinc-400 dark:text-zinc-600">
            {t.totalPurchase}
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
              {t.sortByLabel}
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10"
            >
              <option value="category">{t.sortCategory}</option>
              <option value="default">{t.sortDefault}</option>
              <option value="name">{t.sortName}</option>
            </select>
          </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {hasPreviousMonthItems && (
                <button
                  type="button"
                  onClick={onOpenImportModal}
                  className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  {t.importPreviousShort}
                </button>
              )}
              <button
                type="button"
                onClick={onGoToCategories}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                {t.plusCategories}
              </button>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearList}
                  className="text-xs font-medium text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  {t.clearList}
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
