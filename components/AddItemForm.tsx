import React, { useState } from 'react';
import { Plus, Tag, Hash, BadgeDollarSign } from 'lucide-react';
import { motion } from 'motion/react';

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
    <form onSubmit={handleSubmit} className="space-y-4 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="relative sm:col-span-12 lg:col-span-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Tag size={18} />
          </div>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Ex: Leite, Ovos, Pão..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            aria-label="Nome do item"
          />
        </div>

        <div className="relative sm:col-span-6 lg:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Hash size={18} />
          </div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qtd"
            min="1"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            aria-label="Quantidade"
          />
        </div>

        <div className="relative sm:col-span-6 lg:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <BadgeDollarSign size={18} />
          </div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
            inputMode="decimal"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            aria-label="Preço"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
        disabled={!itemName.trim()}
      >
        <Plus size={20} strokeWidth={3} />
        <span>Adicionar Item</span>
      </motion.button>
    </form>
  );
};
