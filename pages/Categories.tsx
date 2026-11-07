import React, { useState, useMemo } from 'react';
import { getProductCatalog } from '../data/catalog';
import { useLanguage } from '../lib/i18n';
import type { ShoppingItem, Language } from '../types';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ProductIcon } from '../components/icons/ProductIcon';

interface CategoriesProps {
  items: ShoppingItem[];
  onToggleCatalogItem: (name: string, category: string) => void;
  onGoToList: () => void;
}

const CATEGORIES_COPY: Record<
  Language,
  {
    title: string;
    subtitlePart1: string;
    listTabName: string;
    subtitlePart2: string;
    viewList: (count: number) => string;
    searchPlaceholder: string;
    all: (count: number) => string;
    noProductsFound: (query: string) => string;
    tryAnotherTerm: string;
    inList: (count: number) => string;
  }
> = {
  pt: {
    title: 'Planejamento por Categoria',
    subtitlePart1:
      'Selecione o que precisa comprar antes de ir ao mercado. No mercado, informe a quantidade e o valor na aba ',
    listTabName: 'Lista',
    subtitlePart2: ' conforme encontrar os produtos.',
    viewList: (count) => `Ver lista (${count})`,
    searchPlaceholder:
      'Buscar produto ou categoria (ex: leite, frutas, limpeza)...',
    all: (count) => `Todas (${count})`,
    noProductsFound: (q) => `Nenhum produto encontrado para “${q}”`,
    tryAnotherTerm:
      'Tente outro termo ou adicione um item personalizado diretamente na aba Lista.',
    inList: (count) => `${count} na lista`,
  },
  en: {
    title: 'Plan by Category',
    subtitlePart1:
      'Select what you need before heading to the store. Once there, enter the quantity and price in the ',
    listTabName: 'List',
    subtitlePart2: ' tab as you pick up each item.',
    viewList: (count) => `View list (${count})`,
    searchPlaceholder:
      'Search product or category (e.g. milk, produce, cleaning)...',
    all: (count) => `All (${count})`,
    noProductsFound: (q) => `No products found for “${q}”`,
    tryAnotherTerm:
      'Try another search term or add a custom item directly in the List tab.',
    inList: (count) => `${count} in list`,
  },
  es: {
    title: 'Planificación por Categoría',
    subtitlePart1:
      'Selecciona lo que necesitas comprar antes de ir al supermercado. En la tienda, indica la cantidad y el precio en la pestaña ',
    listTabName: 'Lista',
    subtitlePart2: ' a medida que encuentres los productos.',
    viewList: (count) => `Ver lista (${count})`,
    searchPlaceholder:
      'Buscar producto o categoría (ej: leche, frutas, limpieza)...',
    all: (count) => `Todas (${count})`,
    noProductsFound: (q) => `No se encontraron productos para “${q}”`,
    tryAnotherTerm:
      'Prueba con otro término o añade un artículo personalizado directamente en la pestaña Lista.',
    inList: (count) => `${count} en la lista`,
  },
  zh: {
    title: '按分类目录规划采购',
    subtitlePart1: '出发去超市前先勾选需要购买的商品。到达超市后，在“',
    listTabName: '清单',
    subtitlePart2: '”页面中边拿商品边输入数量与单价。',
    viewList: (count) => `查看清单 (${count})`,
    searchPlaceholder: '搜索商品或分类（如：牛奶、水果、清洁）...',
    all: (count) => `全部 (${count})`,
    noProductsFound: (q) => `未找到与“${q}”相关的商品`,
    tryAnotherTerm: '请尝试其它关键词，或直接在“清单”页面添加自定义商品。',
    inList: (count) => `已选 ${count} 件`,
  },
};

export const Categories: React.FC<CategoriesProps> = ({
  items,
  onToggleCatalogItem,
  onGoToList,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const { language } = useLanguage();
  const t = CATEGORIES_COPY[language];

  const catalog = useMemo(() => getProductCatalog(language), [language]);

  const selectedNamesSet = useMemo(() => {
    return new Set(items.map((item) => item.name.toLowerCase()));
  }, [items]);

  const filteredCatalog = useMemo(() => {
    const query = search.trim().toLowerCase();

    return catalog
      .filter((cat) =>
        activeCategoryId === 'all' ? true : cat.id === activeCategoryId
      )
      .map((cat) => {
        if (!query) return cat;

        const filteredGroups = cat.groups
          .map((group) => ({
            ...group,
            items: group.items.filter(
              (item) =>
                item.toLowerCase().includes(query) ||
                cat.title.toLowerCase().includes(query) ||
                (group.label && group.label.toLowerCase().includes(query))
            ),
          }))
          .filter((group) => group.items.length > 0);

        return {
          ...cat,
          groups: filteredGroups,
        };
      })
      .filter((cat) => cat.groups.length > 0);
  }, [search, activeCategoryId, catalog]);

  const cleanCategoryName = (title: string) => title.replace(/^\d+\.\s*/, '');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {t.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t.subtitlePart1}
              <strong>{t.listTabName}</strong>
              {t.subtitlePart2}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={onGoToList}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>{t.viewList(items.length)}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full h-9 px-3 text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategoryId('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeCategoryId === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {t.all(catalog.length)}
            </button>
            {catalog.map((cat) => {
              const shortName = cleanCategoryName(cat.title);
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <ProductIcon name="" category={cat.title} size="sm" variant="inline" />
                  <span>{shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredCatalog.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-12 px-4 text-center">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t.noProductsFound(search)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">{t.tryAnotherTerm}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCatalog.map((category) => {
            const categoryLabel = cleanCategoryName(category.title);
            const allCategoryItems = category.groups.flatMap((g) => g.items);
            const selectedInCategory = allCategoryItems.filter((item) =>
              selectedNamesSet.has(item.toLowerCase())
            ).length;

            return (
              <section
                key={category.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xs"
              >
                <div className="px-4 py-3 bg-zinc-50/70 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ProductIcon name="" category={category.title} size="md" variant="badge" />
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {category.title}
                      {category.subtitle && (
                        <span className="ml-1.5 font-normal text-xs text-zinc-500 dark:text-zinc-400">
                          ({category.subtitle})
                        </span>
                      )}
                    </h3>
                  </div>

                  {selectedInCategory > 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 tabular-nums">
                      {t.inList(selectedInCategory)}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  {category.groups.map((group, groupIdx) => (
                    <div key={group.label ?? groupIdx}>
                      {group.label && (
                        <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                          {group.label}
                        </h4>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((itemName) => {
                          const isSelected = selectedNamesSet.has(
                            itemName.toLowerCase()
                          );

                          return (
                            <button
                              key={itemName}
                              type="button"
                              onClick={() =>
                                onToggleCatalogItem(itemName, categoryLabel)
                              }
                              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-2xs'
                                  : 'bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/70 dark:hover:bg-zinc-900'
                              }`}
                            >
                              <ProductIcon
                                name={itemName}
                                category={categoryLabel}
                                size="sm"
                                variant="inline"
                              />
                              <span>{itemName}</span>
                              {isSelected ? (
                                <svg
                                  className="w-3.5 h-3.5 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <PlusIcon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
