// FIX: Replaced placeholder content with a functional App component to serve as the main entry point and state manager for the application.
import React, { useState, useEffect, useMemo } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { Header } from './components/Header';
import { ShoppingList } from './components/ShoppingList';
import { Navigation } from './components/Navigation';
import { About } from './pages/About';
import { Donation } from './pages/Donation';
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
  const [page, setPage] = useState<'list' | 'about' | 'donation'>('list');
  const [exitingItemIds, setExitingItemIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('shoppingListItems', JSON.stringify(items));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [items]);

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
    setExitingItemIds(prev => [...prev, id]);
    setTimeout(() => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setExitingItemIds(prev => prev.filter(itemId => itemId !== id));
    }, 300); // Corresponds to animation duration
  };

  const handleClearList = () => {
    setExitingItemIds(items.map(item => item.id));
    setTimeout(() => {
      setItems([]);
      setExitingItemIds([]);
    }, 300);
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
    // 'default' sort is by insertion order, so no extra sorting needed.
    
    return [...uncompleted, ...completed];
  }, [items, sortBy]);

  const totalPrice = useMemo(() => {
    return items
      .filter(item => !item.completed)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Header />
        <Navigation page={page} setPage={setPage} />

        <main>
          {page === 'list' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 animate-fade-in">
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
                exitingItemIds={exitingItemIds}
              />
            </div>
          )}
          {page === 'about' && <About />}
          {page === 'donation' && <Donation />}
        </main>

         <footer className="text-center mt-12 text-slate-400 dark:text-slate-500 text-sm">
          <p>Feito com ❤️ por um dev apaixonado por código.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;