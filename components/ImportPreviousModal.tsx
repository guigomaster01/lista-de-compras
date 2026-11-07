import React, { useState, useMemo, useEffect } from 'react';
import type { MonthlyShoppingList, ShoppingItem, Language } from '../types';
import { useLanguage } from '../lib/i18n';
import { ProductIcon } from './icons/ProductIcon';

interface ImportPreviousModalProps {
  isOpen: boolean;
  onClose: () => void;
  priorLists: MonthlyShoppingList[];
  currentItems: ShoppingItem[];
  onImportItems: (itemsToImport: ShoppingItem[], keepPrices: boolean) => void;
}

const MODAL_COPY: Record<
  Language,
  {
    title: string;
    subtitle: string;
    sourceMonthLabel: string;
    selectAll: string;
    deselectAll: string;
    alreadyInList: string;
    qtyLabel: (qty: number) => string;
    paidLabel: (price: string) => string;
    noPriceRecorded: string;
    keepPricesLabel: string;
    keepPricesHint: string;
    cancelBtn: string;
    importSelectedBtn: (count: number) => string;
    importAllBtn: (count: number) => string;
    allAlreadyInList: string;
  }
> = {
  pt: {
    title: 'Importar itens de lista anterior',
    subtitle:
      'Escolha todos os produtos ou selecione apenas os itens que deseja trazer para a lista deste mês.',
    sourceMonthLabel: 'Lista de origem:',
    selectAll: 'Selecionar todos',
    deselectAll: 'Desmarcar todos',
    alreadyInList: 'Já está na lista atual',
    qtyLabel: (qty) => `Qtd: ${qty}`,
    paidLabel: (price) => `Pago: ${price}`,
    noPriceRecorded: 'Sem preço',
    keepPricesLabel: 'Manter os preços do mês anterior nos itens importados',
    keepPricesHint:
      'Se desmarcado, os itens vêm com preço R$ 0,00 para você preencher no mercado (o valor antigo continuará visível na etiqueta de comparação).',
    cancelBtn: 'Cancelar',
    importSelectedBtn: (count) => `Importar selecionados (${count})`,
    importAllBtn: (count) => `Importar todos (${count})`,
    allAlreadyInList:
      'Todos os itens desta lista anterior já foram adicionados à sua lista atual.',
  },
  en: {
    title: 'Import items from a previous list',
    subtitle:
      'Import everything at once or pick only the specific items you want to add to this month’s list.',
    sourceMonthLabel: 'Source list:',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    alreadyInList: 'Already in current list',
    qtyLabel: (qty) => `Qty: ${qty}`,
    paidLabel: (price) => `Paid: ${price}`,
    noPriceRecorded: 'No price',
    keepPricesLabel: 'Keep previous month’s prices on imported items',
    keepPricesHint:
      'If unchecked, items are imported with $0.00 so you can enter store prices as you shop (last month’s price will still show as a comparison badge).',
    cancelBtn: 'Cancel',
    importSelectedBtn: (count) => `Import selected (${count})`,
    importAllBtn: (count) => `Import all (${count})`,
    allAlreadyInList:
      'All items from this previous list are already in your current list.',
  },
  es: {
    title: 'Importar productos de una lista anterior',
    subtitle:
      'Importa todos los productos o elige solo los que quieras añadir a la lista de este mes.',
    sourceMonthLabel: 'Lista de origen:',
    selectAll: 'Seleccionar todos',
    deselectAll: 'Desmarcar todos',
    alreadyInList: 'Ya está en la lista actual',
    qtyLabel: (qty) => `Cant: ${qty}`,
    paidLabel: (price) => `Pagado: ${price}`,
    noPriceRecorded: 'Sin precio',
    keepPricesLabel: 'Mantener los precios del mes anterior en los productos importados',
    keepPricesHint:
      'Si se desmarca, los productos se importan con precio $0,00 para rellenar en el súper (el precio anterior seguirá visible como comparación).',
    cancelBtn: 'Cancelar',
    importSelectedBtn: (count) => `Importar seleccionados (${count})`,
    importAllBtn: (count) => `Importar todos (${count})`,
    allAlreadyInList:
      'Todos los productos de esta lista anterior ya están en tu lista actual.',
  },
  zh: {
    title: '从历史清单导入商品',
    subtitle: '可一键导入全部商品，或自由勾选本月需要复用的商品。',
    sourceMonthLabel: '选择历史月份：',
    selectAll: '全选',
    deselectAll: '取消全选',
    alreadyInList: '已在当前清单中',
    qtyLabel: (qty) => `数量: ${qty}`,
    paidLabel: (price) => `上次单价: ${price}`,
    noPriceRecorded: '未记录价格',
    keepPricesLabel: '保留上月单价作为本月预算参考',
    keepPricesHint:
      '若不勾选，导入商品的单价将设为 0，方便您在超市现场填写新价格（上月价格仍会显示在比价标签中）。',
    cancelBtn: '取消',
    importSelectedBtn: (count) => `导入已选商品 (${count})`,
    importAllBtn: (count) => `一键导入全部 (${count})`,
    allAlreadyInList: '该历史清单中的所有商品均已在您本月的清单中。',
  },
};

export const ImportPreviousModal: React.FC<ImportPreviousModalProps> = ({
  isOpen,
  onClose,
  priorLists,
  currentItems,
  onImportItems,
}) => {
  const { language, formatCurrency, formatMonthLabel } = useLanguage();
  const t = MODAL_COPY[language];

  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    () => priorLists[0]?.monthKey || ''
  );
  const [keepPrices, setKeepPrices] = useState<boolean>(false);

  useEffect(() => {
    if (priorLists.length > 0 && !priorLists.some((l) => l.monthKey === selectedMonthKey)) {
      setSelectedMonthKey(priorLists[0].monthKey);
    }
  }, [priorLists, selectedMonthKey]);

  const sourceList = useMemo(
    () => priorLists.find((l) => l.monthKey === selectedMonthKey) || priorLists[0],
    [priorLists, selectedMonthKey]
  );

  const currentNamesSet = useMemo(
    () => new Set(currentItems.map((i) => i.name.trim().toLowerCase())),
    [currentItems]
  );

  const availableItems = useMemo(() => {
    if (!sourceList) return [];
    return sourceList.items.filter(
      (item) => !currentNamesSet.has(item.name.trim().toLowerCase())
    );
  }, [sourceList, currentNamesSet]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Sempre que mudar o mês de origem ou abrir o modal, pré-seleciona todos os itens disponíveis
  useEffect(() => {
    if (isOpen && sourceList) {
      const nextSet = new Set<number>();
      for (const item of sourceList.items) {
        if (!currentNamesSet.has(item.name.trim().toLowerCase())) {
          nextSet.add(item.id);
        }
      }
      setSelectedIds(nextSet);
    }
  }, [isOpen, sourceList, currentNamesSet]);

  if (!isOpen || !sourceList) return null;

  const toggleItemSelection = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(availableItems.map((i) => i.id)));
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleConfirmSelected = () => {
    const chosen = sourceList.items.filter((i) => selectedIds.has(i.id));
    if (chosen.length === 0) return;
    onImportItems(chosen, keepPrices);
    onClose();
  };

  const handleConfirmAll = () => {
    if (availableItems.length === 0) return;
    onImportItems(availableItems, keepPrices);
    onClose();
  };

  const allSelected =
    availableItems.length > 0 && selectedIds.size === availableItems.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-modal-title"
    >
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-zinc-900 border-t sm:border border-zinc-200 dark:border-zinc-800 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-3">
          <div>
            <h3
              id="import-modal-title"
              className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
            >
              {t.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={t.cancelBtn}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Barra de seleção de mês e marcar/desmarcar todos */}
        <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="source-month-select"
              className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              {t.sourceMonthLabel}
            </label>
            <select
              id="source-month-select"
              value={sourceList.monthKey}
              onChange={(e) => setSelectedMonthKey(e.target.value)}
              className="h-8 px-2.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10"
            >
              {priorLists.map((list) => (
                <option key={list.monthKey} value={list.monthKey}>
                  {formatMonthLabel(list.monthKey)} ({list.items.length})
                </option>
              ))}
            </select>
          </div>

          {availableItems.length > 0 && (
            <button
              type="button"
              onClick={allSelected ? handleDeselectAll : handleSelectAll}
              className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white underline underline-offset-2 cursor-pointer"
            >
              {allSelected ? t.deselectAll : t.selectAll}
            </button>
          )}
        </div>

        {/* Lista de Itens */}
        <div className="flex-grow overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80 px-5 py-2">
          {availableItems.length === 0 && (
            <div className="py-4 px-3 my-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 text-center">
              {t.allAlreadyInList}
            </div>
          )}

          {sourceList.items.map((item) => {
            const isAlreadyPresent = currentNamesSet.has(
              item.name.trim().toLowerCase()
            );
            const isChecked = !isAlreadyPresent && selectedIds.has(item.id);

            return (
              <label
                key={item.id}
                className={`flex items-center justify-between gap-3 py-2.5 select-none ${
                  isAlreadyPresent
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 -mx-2 px-2 rounded-lg'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    disabled={isAlreadyPresent}
                    checked={isChecked}
                    onChange={() => toggleItemSelection(item.id)}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-500 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
                  />
                  <ProductIcon
                    name={item.name}
                    category={item.category}
                    size="sm"
                    variant="badge"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {item.name}
                      </span>
                      {item.category && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {item.category}
                        </span>
                      )}
                      {isAlreadyPresent && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium">
                          {t.alreadyInList}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 tabular-nums flex-shrink-0">
                  <span>{t.qtyLabel(item.quantity)}</span>
                  <span>•</span>
                  <span>
                    {item.price > 0
                      ? t.paidLabel(formatCurrency(item.price))
                      : t.noPriceRecorded}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Opção de manter preços + Botões de Ação */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keepPrices}
              onChange={(e) => setKeepPrices(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-500 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-medium text-zinc-800 dark:text-zinc-200 block">
                {t.keepPricesLabel}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed block mt-0.5">
                {t.keepPricesHint}
              </span>
            </div>
          </label>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {t.cancelBtn}
            </button>

            {availableItems.length > 0 && !allSelected && (
              <button
                type="button"
                onClick={handleConfirmAll}
                className="px-4 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300/70 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
              >
                {t.importAllBtn(availableItems.length)}
              </button>
            )}

            <button
              type="button"
              disabled={selectedIds.size === 0}
              onClick={handleConfirmSelected}
              className="px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {t.importSelectedBtn(selectedIds.size)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

