import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number, price: number) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemName.trim()) {
      const numQuantity = parseInt(quantity, 10) || 1;
      const numPrice = parseFloat(price.replace(',', '.')) || 0;
      onAddItem(itemName.trim(), numQuantity, numPrice);
      setItemName('');
      setQuantity('1');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-nowrap gap-3 mb-6">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Ex: Leite, Ovos, Pão..."
        className="flex-grow w-full px-4 py-2 text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        aria-label="Nome do item"
      />
      <div className="flex gap-3 w-full sm:w-auto">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Qtd"
          min="1"
          className="w-1/2 sm:w-20 px-4 py-2 text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          aria-label="Quantidade"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço"
          inputMode="decimal"
          className="w-1/2 sm:w-24 px-4 py-2 text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          aria-label="Preço"
        />
      </div>
      <button
        type="submit"
        className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!itemName.trim()}
      >
        <PlusIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Adicionar</span>
      </button>
    </form>
  );
};
