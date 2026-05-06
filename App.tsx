import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AddItemForm } from './components/AddItemForm';
import { Header } from './components/Header';
import { ShoppingList } from './components/ShoppingList';
import { Navigation } from './components/Navigation';
import { About } from './pages/About';
import { Donation } from './pages/Donation';
import { Catalog } from './pages/Catalog';
import type { ShoppingItem } from './types';

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    try {
      const storedItems = localStorage.getItem('shoppingListItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  const [sortBy, setSortBy] = useState<'default' | 'name'>('default');
  const [page, setPage] = useState<'list' | 'about' | 'donation' | 'catalog'>('list');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shoppingListItems', JSON.stringify(items));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [items]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddItem = (name: string, quantity: number, price: number) => {
    const newItem: ShoppingItem = {
      id: Date.now(),
      name,
      completed: false,
      quantity,
      price,
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleToggleItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearList = () => {
    setItems([]);
  };

  const handleUpdatePrice = (id: number, newPrice: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSortChange = (newSortBy: 'default' | 'name') => {
    setSortBy(newSortBy);
  };

  const sortedItems = useMemo(() => {
    const uncompleted = items.filter(item => !item.completed);
    const completed = items.filter(item => item.completed);

    if (sortBy === 'name') {
      uncompleted.sort((a, b) => a.name.localeCompare(b.name));
      completed.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return [...uncompleted, ...completed];
  }, [items, sortBy]);

  const totalPrice = useMemo(() => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);
  
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-500 pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <Navigation page={page} setPage={setPage} />

        <main className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {page === 'list' && (
              <motion.div 
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white dark:bg-slate-900 rounded-3xl card-shadow border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-10"
              >
                <AddItemForm onAddItem={handleAddItem} />
                <ShoppingList
                  items={sortedItems}
                  onToggleItem={handleToggleItem}
                  onRemoveItem={handleRemoveItem}
                  onClearList={handleClearList}
                  onSortChange={handleSortChange}
                  onUpdatePrice={handleUpdatePrice}
                  onUpdateQuantity={handleUpdateQuantity}
                  totalPrice={totalPrice}
                />
              </motion.div>
            )}
            {page === 'about' && (
              <About key="about" />
            )}
            {page === 'donation' && (
              <Donation key="donation" />
            )}
            {page === 'catalog' && (
              <Catalog 
                key="catalog" 
                onAddItem={handleAddItem} 
                currentItems={items.map(i => i.name)}
              />
            )}
          </AnimatePresence>
        </main>

        <footer className="text-center mt-12 text-slate-400 dark:text-slate-600 text-sm pb-24 sm:pb-12">
          <p className="flex items-center justify-center gap-1.5">
            Feito com <span className="text-red-500 animate-pulse">❤️</span> por um dev apaixonado por código.
          </p>
        </footer>
      </div>

      {/* Navegação Inferior Secundária */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="flex glass rounded-full card-shadow border border-slate-200/50 dark:border-slate-800/50 p-1.5 pointer-events-auto">
          <button
            onClick={() => setPage('about')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              page === 'about'
                ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>Sobre</span>
          </button>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 my-auto mx-1" />
          <button
            onClick={() => setPage('donation')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              page === 'donation'
                ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>Doação</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
