import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Check, ChevronRight, Apple, Milk, Croissant, Beef, Container, Coffee, Zap, User } from 'lucide-react';

interface CatalogItem {
  name: string;
  category: string;
  icon?: any;
}

const CATALOG_DATA: CatalogItem[] = [
  // Hortifruti
  { name: 'Abacate', category: 'Hortifruti' },
  { name: 'Abacaxi', category: 'Hortifruti' },
  { name: 'Abobrinha', category: 'Hortifruti' },
  { name: 'Alface', category: 'Hortifruti' },
  { name: 'Alho', category: 'Hortifruti' },
  { name: 'Banana', category: 'Hortifruti' },
  { name: 'Batata', category: 'Hortifruti' },
  { name: 'Cebola', category: 'Hortifruti' },
  { name: 'Cenoura', category: 'Hortifruti' },
  { name: 'Laranja', category: 'Hortifruti' },
  { name: 'Limão', category: 'Hortifruti' },
  { name: 'Maçã', category: 'Hortifruti' },
  { name: 'Mamão', category: 'Hortifruti' },
  { name: 'Melancia', category: 'Hortifruti' },
  { name: 'Ovos', category: 'Laticínios & Ovos' },
  { name: 'Pimentão', category: 'Hortifruti' },
  { name: 'Tomate', category: 'Hortifruti' },
  { name: 'Uva', category: 'Hortifruti' },

  // Laticínios
  { name: 'Iogurte', category: 'Laticínios & Ovos' },
  { name: 'Leite', category: 'Laticínios & Ovos' },
  { name: 'Manteiga', category: 'Laticínios & Ovos' },
  { name: 'Queijo', category: 'Laticínios & Ovos' },
  { name: 'Requeijão', category: 'Laticínios & Ovos' },

  // Padaria
  { name: 'Biscoito', category: 'Padaria' },
  { name: 'Bolo', category: 'Padaria' },
  { name: 'Pão de Forma', category: 'Padaria' },
  { name: 'Pão Francês', category: 'Padaria' },
  { name: 'Torrada', category: 'Padaria' },

  // Açougue
  { name: 'Carne Moída', category: 'Açougue' },
  { name: 'Frango', category: 'Açougue' },
  { name: 'Linguiça', category: 'Açougue' },
  { name: 'Peixe', category: 'Açougue' },
  { name: 'Presunto', category: 'Açougue' },
  { name: 'Salsicha', category: 'Açougue' },

  // Despensa
  { name: 'Açúcar', category: 'Despensa' },
  { name: 'Arroz', category: 'Despensa' },
  { name: 'Azeite', category: 'Despensa' },
  { name: 'Café', category: 'Despensa' },
  { name: 'Farinha de Trigo', category: 'Despensa' },
  { name: 'Feijão', category: 'Despensa' },
  { name: 'Macarrão', category: 'Despensa' },
  { name: 'Molho de Tomate', category: 'Despensa' },
  { name: 'Óleo', category: 'Despensa' },
  { name: 'Sal', category: 'Despensa' },

  // Bebidas
  { name: 'Água', category: 'Bebidas' },
  { name: 'Cerveja', category: 'Bebidas' },
  { name: 'Refrigerante', category: 'Bebidas' },
  { name: 'Suco', category: 'Bebidas' },
  { name: 'Vinho', category: 'Bebidas' },

  // Limpeza
  { name: 'Amaciante', category: 'Limpeza' },
  { name: 'Detergente', category: 'Limpeza' },
  { name: 'Desinfetante', category: 'Limpeza' },
  { name: 'Papel Higiênico', category: 'Limpeza' },
  { name: 'Sabão em Pó', category: 'Limpeza' },

  // Higiene
  { name: 'Creme Dental', category: 'Higiene' },
  { name: 'Desodorante', category: 'Higiene' },
  { name: 'Escova de Dente', category: 'Higiene' },
  { name: 'Sabonete', category: 'Higiene' },
  { name: 'Shampoo', category: 'Higiene' },
];

const CATEGORY_ICONS: Record<string, any> = {
  'Hortifruti': Apple,
  'Laticínios & Ovos': Milk,
  'Padaria': Croissant,
  'Açougue': Beef,
  'Despensa': Container,
  'Bebidas': Coffee,
  'Limpeza': Zap,
  'Higiene': User,
};

interface CatalogProps {
  onAddItem: (name: string, quantity: number, price: number) => void;
  currentItems: string[];
}

export const Catalog: React.FC<CatalogProps> = ({ onAddItem, currentItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAdd = (name: string) => {
    onAddItem(name, 1, 0);
    setAddedItems(prev => new Set(prev).add(name));
  };

  const filteredCatalog = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const sorted = [...CATALOG_DATA].sort((a, b) => a.name.localeCompare(b.name));
    
    if (!term) return sorted;
    return sorted.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(filteredCatalog.map(item => item.category)));
    return cats.sort();
  }, [filteredCatalog]);

  return (
    <motion.div
      key="catalog"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-900 rounded-3xl card-shadow border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
          Catálogo de Itens
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Toque nos itens abaixo para adicioná-los rapidamente à sua lista.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Procurar item ou categoria..."
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
        />
      </div>

      <div className="space-y-10">
        {categories.map(category => {
          const categoryItems = filteredCatalog.filter(item => item.category === category);
          const Icon = CATEGORY_ICONS[category] || ChevronRight;

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200">
                  {category}
                </h3>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-lg ml-auto">
                  {categoryItems.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categoryItems.map(item => {
                  const isAlreadyInList = currentItems.includes(item.name);
                  const isJustAdded = addedItems.has(item.name);
                  const isActive = isAlreadyInList || isJustAdded;

                  return (
                    <motion.button
                      key={item.name}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !isActive && handleAdd(item.name)}
                      disabled={isActive}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                        isActive
                          ? 'bg-slate-50 dark:bg-slate-800/20 border-transparent text-slate-400 dark:text-slate-600'
                          : 'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900/30 text-slate-700 dark:text-slate-300 shadow-sm'
                      }`}
                    >
                      <span className="font-semibold text-sm">{item.name}</span>
                      <div className={`p-1 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-indigo-600'
                      }`}>
                        {isActive ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 mb-4">
              <Search size={40} />
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Nenhum item encontrado</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Tente buscar por outro termo ou categoria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
