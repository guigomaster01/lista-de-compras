import React from 'react';
import type { ShoppingItem } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onClearList: () => void;
  onSortChange: (sortBy: 'default' | 'name') => void;
  totalPrice: number;
  exitingItemIds: number[];
}

const ShoppingListItem: React.FC<{
  item: ShoppingItem;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  isExiting: boolean;
}> = ({ item, onToggle, onRemove, isExiting }) => {
  const animationClass = isExiting ? 'animate-fade-out-scale' : 'animate-fade-in-scale';
  const completedClass = item.completed ? 'completed bg-slate-100 dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-700/50';

  return (
    <li className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${animationClass} ${completedClass}`}>
      <div className="flex items-center gap-3 flex-grow">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
        />
        <div className="flex-grow">
          <span className={`text-lg transition-colors duration-300 ${item.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
            <span className="strikethrough-container">{item.name}</span>
          </span>
          <p className={`text-sm transition-opacity duration-300 ${item.completed ? 'text-slate-500' : 'text-slate-600 dark:text-slate-400'}`}>
            {item.quantity} &times; R$ {item.price.toFixed(2).replace('.', ',')} = <span className="font-medium">R$ {(item.quantity * item.price).toFixed(2).replace('.', ',')}</span>
          </p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 ml-2 text-slate-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-all flex-shrink-0"
        aria-label={`Remover ${item.name}`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onRemoveItem, onClearList, onSortChange, totalPrice, exitingItemIds }) => {
  if (items.length === 0 && exitingItemIds.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">Sua lista está vazia!</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Adicione um item para começar.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <label htmlFor="sort-select" className="sr-only">Ordenar por</label>
          <select
            id="sort-select"
            onChange={(e) => onSortChange(e.target.value as 'default' | 'name')}
            className="px-3 py-1.5 text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Ordernar por Padrão</option>
            <option value="name">Ordernar por Nome (A-Z)</option>
          </select>
        </div>
        <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          Total: <span className="text-indigo-600 dark:text-indigo-400">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
      <ul className="space-y-3">
        {items.map(item => (
          <ShoppingListItem
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onRemove={onRemoveItem}
            isExiting={exitingItemIds.includes(item.id)}
          />
        ))}
      </ul>
      {items.length > 0 && (
         <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClearList}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
          >
            Remover todos
          </button>
        </div>
      )}
    </div>
  );
};