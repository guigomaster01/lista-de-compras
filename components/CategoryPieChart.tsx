import React, { useMemo, useState } from 'react';
import type { ShoppingItem } from '../types';
import { useLanguage } from '../lib/i18n';

interface CategoryPieChartProps {
  items: ShoppingItem[];
}

interface CategorySlice {
  category: string;
  value: number;
  percentage: number;
  color: string;
  itemCount: number;
}

const SLICE_COLORS = [
  '#18181b', // zinc-900 / primary
  '#10b981', // emerald-500
  '#3b82f6', // blue-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#64748b', // slate-500
  '#84cc16', // lime-500
];

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { language, formatCurrency } = useLanguage();
  const isEn = language === 'en';

  const uncategorizedLabel = isEn ? 'Uncategorized' : 'Sem categoria';

  const { slices, grandTotal } = useMemo(() => {
    const totalsByCat = new Map<string, { value: number; count: number }>();

    for (const item of items) {
      const subtotal = item.quantity * item.price;
      const catName = item.category?.trim() || uncategorizedLabel;
      const current = totalsByCat.get(catName) || { value: 0, count: 0 };
      totalsByCat.set(catName, {
        value: current.value + subtotal,
        count: current.count + 1,
      });
    }

    const entries = Array.from(totalsByCat.entries())
      .filter(([, data]) => data.value > 0)
      .sort((a, b) => b[1].value - a[1].value);

    const total = entries.reduce((acc, [, data]) => acc + data.value, 0);

    const computedSlices: CategorySlice[] = entries.map(
      ([category, data], idx) => ({
        category,
        value: data.value,
        itemCount: data.count,
        percentage: total > 0 ? (data.value / total) * 100 : 0,
        color: SLICE_COLORS[idx % SLICE_COLORS.length],
      })
    );

    return { slices: computedSlices, grandTotal: total };
  }, [items, uncategorizedLabel]);

  // Cálculo dos arcos do gráfico pizza/donut em SVG
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  const activeSlice = hoveredCategory
    ? slices.find((s) => s.category === hoveredCategory)
    : null;

  const formatPct = (pct: number) =>
    isEn ? `${pct.toFixed(1)}%` : `${pct.toFixed(1).replace('.', ',')}%`;

  return (
    <div className="pt-2">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-2xs"
        >
          <svg
            className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
          <span>
            {isOpen
              ? isEn
                ? 'Hide category chart'
                : 'Ocultar gráfico por categoria'
              : isEn
                ? 'Show category chart'
                : 'Gerar gráfico por categoria'}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-2xs animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {isEn ? 'Spending by Category' : 'Gastos por Categoria'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {isEn
                  ? 'Proportional breakdown of item costs in your list'
                  : 'Distribuição proporcional do valor dos itens da lista'}
              </p>
            </div>
          </div>

          {grandTotal === 0 ? (
            <div className="py-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {isEn
                  ? 'No prices entered in the list yet.'
                  : 'Ainda não há valores preenchidos na lista.'}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                {isEn
                  ? 'Enter the price of at least one item above to generate the chart.'
                  : 'Informe o preço de pelo menos um produto acima para gerar o gráfico.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Gráfico Pizza / Donut SVG */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg
                    viewBox="0 0 180 180"
                    className="w-full h-full -rotate-90 transform"
                  >
                    {slices.map((slice) => {
                      const strokeDasharray = `${
                        (slice.percentage / 100) * circumference
                      } ${circumference}`;
                      const strokeDashoffset = -(
                        (cumulativePercent / 100) *
                        circumference
                      );
                      cumulativePercent += slice.percentage;

                      const isHovered = hoveredCategory === slice.category;

                      return (
                        <circle
                          key={slice.category}
                          cx="90"
                          cy="90"
                          r={radius}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth={isHovered ? 26 : 22}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-200 cursor-pointer"
                          style={{
                            opacity:
                              hoveredCategory && !isHovered ? 0.45 : 1,
                          }}
                          onMouseEnter={() =>
                            setHoveredCategory(slice.category)
                          }
                          onMouseLeave={() => setHoveredCategory(null)}
                        />
                      );
                    })}
                  </svg>

                  {/* Centro do Gráfico */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[110px]">
                      {activeSlice ? activeSlice.category : 'Total'}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums mt-0.5">
                      {formatCurrency(
                        activeSlice ? activeSlice.value : grandTotal
                      )}
                    </span>
                    {activeSlice && (
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tabular-nums">
                        {formatPct(activeSlice.percentage)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Legenda detalhada por categoria */}
              <div className="sm:col-span-7 space-y-2">
                {slices.map((slice) => {
                  const isHovered = hoveredCategory === slice.category;
                  return (
                    <div
                      key={slice.category}
                      onMouseEnter={() => setHoveredCategory(slice.category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`flex items-center justify-between gap-3 p-2 rounded-lg transition-colors cursor-default ${
                        isHovered
                          ? 'bg-zinc-100 dark:bg-zinc-800/80'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3 h-3 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: slice.color }}
                        />
                        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">
                          {slice.category}
                        </span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                          ({slice.itemCount})
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0 tabular-nums">
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          {formatCurrency(slice.value)}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 w-12 text-right">
                          {formatPct(slice.percentage)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
