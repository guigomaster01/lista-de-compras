import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingCart, ArrowUpDown, XCircle, Check, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ShoppingItem } from '../types';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onClearList: () => void;
  onSortChange: (sortBy: 'default' | 'name') => void;
  onUpdatePrice: (id: number, newPrice: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  totalPrice: number;
}

const ShoppingListItem: React.FC<{
  item: ShoppingItem;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdatePrice: (id: number, newPrice: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}> = ({ item, onToggle, onRemove, onUpdatePrice, onUpdateQuantity }) => {
  const [editingField, setEditingField] = useState<'price' | 'quantity' | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const handleStartEdit = (field: 'price' | 'quantity') => {
    if (!item.completed) {
      setEditValue(field === 'price' ? item.price.toString() : item.quantity.toString());
      setEditingField(field);
    }
  };

  const handleSave = () => {
    if (editingField === 'price') {
      const val = parseFloat(editValue.replace(',', '.'));
      if (!isNaN(val) && val >= 0) onUpdatePrice(item.id, val);
    } else if (editingField === 'quantity') {
      const val = parseInt(editValue, 10);
      if (!isNaN(val) && val > 0) onUpdateQuantity(item.id, val);
    }
    setEditingField(null);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, x: -20 }}
      className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border-2 ${
        item.completed 
          ? 'bg-slate-50 dark:bg-slate-800/30 border-transparent grayscale italic opacity-60' 
          : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900/30 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4 flex-grow">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
            className="peer w-6 h-6 opacity-0 absolute cursor-pointer z-10"
          />
          <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
            item.completed 
              ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' 
              : 'border-slate-300 dark:border-slate-600 peer-hover:border-indigo-500'
          }`}>
            {item.completed && <Check size={14} className="text-white" strokeWidth={4} />}
          </div>
        </div>

        <div className="flex-grow overflow-hidden">
          <span className={`text-[17px] font-semibold block truncate transition-all duration-300 ${
            item.completed ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'
          }`}>
            {item.name}
          </span>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <button
              onClick={() => handleStartEdit('quantity')}
              disabled={item.completed}
              className={`flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${item.completed ? '' : 'cursor-pointer'}`}
            >
              {editingField === 'quantity' ? (
                <input
                  ref={inputRef}
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="w-10 px-1 py-0.5 bg-white dark:bg-slate-700 border border-indigo-500 rounded outline-none"
                />
              ) : (
                <>{item.quantity} un.</>
              )}
            </button>
            <span>•</span>
            <button
              onClick={() => handleStartEdit('price')}
              disabled={item.completed}
              className={`flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${item.completed ? '' : 'cursor-pointer'}`}
            >
              {editingField === 'price' ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="w-16 px-1 py-0.5 bg-white dark:bg-slate-700 border border-indigo-500 rounded outline-none"
                />
              ) : (
                <>R$ {item.price.toFixed(2).replace('.', ',')}</>
              )}
            </button>
            <span className="hidden sm:inline">•</span>
            <span className="text-indigo-600/80 dark:text-indigo-400/80">
              Total: R$ {(item.quantity * item.price).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all sm:opacity-0 group-hover:opacity-100"
        aria-label="Remover item"
      >
        <Trash2 size={18} />
      </button>
    </motion.li>
  );
};

export const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onRemoveItem, onClearList, onSortChange, onUpdatePrice, onUpdateQuantity, totalPrice }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('pt-BR');
    const fileNameDate = date.replace(/\//g, '-');
    
    // Configurações do Título
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.text('Lista de Compras Moderna', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Data: ${date}`, 14, 30);

    // Preparar dados da tabela
    const tableData = items.map(item => [
      item.name,
      item.quantity,
      `R$ ${item.price.toFixed(2).replace('.', ',')}`,
      `R$ ${(item.quantity * item.price).toFixed(2).replace('.', ',')}`
    ]);

    // Gerar tabela
    autoTable(doc, {
      startY: 40,
      head: [['Item', 'Qtd', 'Preço Unit.', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
      didDrawPage: (data) => {
        // Rodapé da tabela com o total final
        const finalY = (data as any).cursor.y;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59); // slate-800
        doc.text(
          `TOTAL ESTIMADO: R$ ${totalPrice.toFixed(2).replace('.', ',')}`,
          doc.internal.pageSize.width - 14,
          finalY + 10,
          { align: 'right' }
        );
      }
    });

    // Salvar o arquivo
    doc.save(`lista-de-compras-${fileNameDate}.pdf`);
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 px-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl"
      >
        <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 mb-4">
          <ShoppingCart size={40} />
        </div>
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Sua lista está vazia</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Comece adicionando alguns itens acima!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl">
        <div className="relative">
          <select
            onChange={(e) => onSortChange(e.target.value as 'default' | 'name')}
            className="appearance-none pl-10 pr-10 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer transition-all"
          >
            <option value="default">Ordem Padrão</option>
            <option value="name">Ordem Alfabética</option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <ArrowUpDown size={16} />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">TOTAL ESTIMADO:</span>
          <span className="text-indigo-600 dark:text-indigo-400">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      <ul className="grid gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map(item => (
            <ShoppingListItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
              onRemove={onRemoveItem}
              onUpdatePrice={onUpdatePrice}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </AnimatePresence>
      </ul>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center sm:justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-400/10 rounded-2xl hover:bg-indigo-100 dark:hover:bg-indigo-400/20 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-400/20"
        >
          <FileText size={18} />
          <span>Baixar PDF</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearList}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 rounded-2xl hover:bg-red-100 dark:hover:bg-red-400/20 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-400/20"
        >
          <XCircle size={18} />
          <span>Limpar Lista</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ShoppingList;
