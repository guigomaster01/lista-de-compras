import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from './lib/firebase';
import { LanguageProvider, useLanguage } from './lib/i18n';
import { AddItemForm } from './components/AddItemForm';
import { Header, type AuthUserDisplay } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { MonthlyBar } from './components/MonthlyBar';
import { ShoppingList, type SortOption } from './components/ShoppingList';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Donation } from './pages/Donation';
import type {
  ShoppingItem,
  PageType,
  MonthlyShoppingList,
  PreviousPriceInfo,
  Language,
} from './types';

const APP_COPY: Record<
  Language,
  {
    userFallback: string;
    localAccount: string;
    authErrorFallback: string;
    othersCategory: string;
  }
> = {
  pt: {
    userFallback: 'Usuário',
    localAccount: 'Conta Local',
    authErrorFallback: 'Falha ao autenticar com o Google.',
    othersCategory: 'Outros',
  },
  en: {
    userFallback: 'User',
    localAccount: 'Local Account',
    authErrorFallback: 'Failed to authenticate with Google.',
    othersCategory: 'Others',
  },
  es: {
    userFallback: 'Usuario',
    localAccount: 'Cuenta Local',
    authErrorFallback: 'Error al autenticar con Google.',
    othersCategory: 'Otros',
  },
  zh: {
    userFallback: '用户',
    localAccount: '本地账户',
    authErrorFallback: 'Google 登录验证失败。',
    othersCategory: '其它',
  },
};

const getCurrentMonthKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const generateUniqueShareId = (): string => {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  const randomValues = new Uint32Array(12);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (v) => chars[v % chars.length]).join('');
};

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const t = APP_COPY[language];

  const [user, setUser] = useState<AuthUserDisplay | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(isFirebaseConfigured);
  const [authError, setAuthError] = useState<string | null>(null);

  const [monthKey, setMonthKey] = useState<string>(getCurrentMonthKey);
  const [sharedListIdParam, setSharedListIdParam] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lista');
  });

  // Mapa de listas do usuário por monthKey (ex: "2026-11" -> MonthlyShoppingList)
  const [monthlyLists, setMonthlyLists] = useState<Record<string, MonthlyShoppingList>>(() => {
    try {
      const stored = localStorage.getItem('monthlyShoppingLists');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Lista aberta via link compartilhado (?lista=xyz)
  const [sharedListDoc, setSharedListDoc] = useState<MonthlyShoppingList | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  const [sortBy, setSortBy] = useState<SortOption>('category');
  const [page, setPage] = useState<PageType>('list');
  const [exitingItemIds, setExitingItemIds] = useState<number[]>([]);

  // Observa autenticação do Firebase
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sincroniza listas mensais do usuário logado com o Firestore
  useEffect(() => {
    if (!db || !user || user.uid === 'local-demo-user') return;

    const q = query(
      collection(db, 'shoppingLists'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextLists: Record<string, MonthlyShoppingList> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as MonthlyShoppingList;
          if (data.monthKey) {
            nextLists[data.monthKey] = data;
          }
        });
        setMonthlyLists((prev) => ({ ...prev, ...nextLists }));
      },
      (err) => {
        console.error('Erro ao buscar listas do Firestore:', err);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Se houver ?lista=<shareId> na URL, escuta esse documento específico em tempo real
  useEffect(() => {
    if (!sharedListIdParam) {
      setSharedListDoc(null);
      return;
    }

    if (!db) {
      const foundLocal = (Object.values(monthlyLists) as MonthlyShoppingList[]).find(
        (list) => list.id === sharedListIdParam
      );
      if (foundLocal) setSharedListDoc(foundLocal);
      return;
    }

    const docRef = doc(db, 'shoppingLists', sharedListIdParam);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSharedListDoc(docSnap.data() as MonthlyShoppingList);
        }
      },
      (err) => {
        console.error('Erro ao carregar lista compartilhada:', err);
      }
    );

    return () => unsubscribe();
  }, [sharedListIdParam, monthlyLists]);

  // Salva backup no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('monthlyShoppingLists', JSON.stringify(monthlyLists));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [monthlyLists]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage', error);
    }
  }, [theme]);

  // Obtém ou inicializa a lista do mês atual (ou a compartilhada)
  const activeList: MonthlyShoppingList = useMemo(() => {
    if (sharedListIdParam && sharedListDoc) {
      return sharedListDoc;
    }
    const existing = monthlyLists[monthKey];
    if (existing) {
      return existing;
    }
    const nowIso = new Date().toISOString();
    return {
      id: generateUniqueShareId(),
      ownerId: user?.uid || 'local-demo-user',
      ownerName: user?.displayName || user?.email || t.userFallback,
      ownerPhoto: user?.photoURL || null,
      monthKey,
      items: [],
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  }, [sharedListIdParam, sharedListDoc, monthlyLists, monthKey, user, t.userFallback]);

  // Garante que a lista do mês corrente tenha ID fixo salvo no estado quando o usuário logar
  useEffect(() => {
    if (!user || sharedListIdParam) return;
    if (!monthlyLists[monthKey]) {
      setMonthlyLists((prev) => ({
        ...prev,
        [monthKey]: activeList,
      }));
    }
  }, [user, monthKey, sharedListIdParam, monthlyLists, activeList]);

  // Mapa com o último preço pago por produto em meses anteriores ao mês ativo
  const { previousPrices, latestPriorList } = useMemo(() => {
    const map: Record<string, PreviousPriceInfo> = {};
    const priorMonthKeys = Object.keys(monthlyLists)
      .filter((k) => k < activeList.monthKey)
      .sort((a, b) => b.localeCompare(a)); // Mais recente primeiro

    let mostRecentWithItems: MonthlyShoppingList | null = null;

    for (const mKey of priorMonthKeys) {
      const list = monthlyLists[mKey];
      if (!list || !list.items) continue;

      if (!mostRecentWithItems && list.items.length > 0) {
        mostRecentWithItems = list;
      }

      for (const item of list.items) {
        const key = item.name.trim().toLowerCase();
        if (item.price > 0 && !map[key]) {
          map[key] = {
            price: item.price,
            monthKey: mKey,
          };
        }
      }
    }

    return { previousPrices: map, latestPriorList: mostRecentWithItems };
  }, [monthlyLists, activeList.monthKey]);

  const persistList = useCallback(
    async (updatedItems: ShoppingItem[]) => {
      const updatedList: MonthlyShoppingList = {
        ...activeList,
        ownerId: activeList.ownerId || user?.uid || 'local-demo-user',
        ownerName:
          activeList.ownerName || user?.displayName || t.userFallback,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };

      if (sharedListIdParam && sharedListDoc) {
        setSharedListDoc(updatedList);
      } else {
        setMonthlyLists((prev) => ({
          ...prev,
          [updatedList.monthKey]: updatedList,
        }));
      }

      if (db && user && user.uid !== 'local-demo-user') {
        try {
          await setDoc(doc(db, 'shoppingLists', updatedList.id), updatedList);
        } catch (err) {
          console.error('Erro ao salvar lista no Firestore:', err);
        }
      }
    },
    [activeList, sharedListIdParam, sharedListDoc, user, t.userFallback]
  );

  const handleImportPreviousMonth = () => {
    if (!latestPriorList) return;
    const importedItems: ShoppingItem[] = latestPriorList.items.map((item, idx) => ({
      id: Date.now() + idx + Math.floor(Math.random() * 1000),
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: 0, // Zera o preço para a pessoa digitar no mercado e ver o comparativo
      completed: false,
    }));
    void persistList(importedItems);
  };

  const handleGoogleLogin = async () => {
    if (!auth || !googleProvider) return;
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : t.authErrorFallback;
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleContinueLocalDemo = () => {
    setUser({
      uid: 'local-demo-user',
      displayName: t.localAccount,
      email: null,
      photoURL: null,
    });
  };

  const handleLogout = async () => {
    if (auth && user?.uid !== 'local-demo-user') {
      await signOut(auth);
    }
    setUser(null);
  };

  const handleExitSharedView = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('lista');
    window.history.replaceState({}, '', url.toString());
    setSharedListIdParam(null);
    setSharedListDoc(null);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const items = activeList.items;

  const handleAddItem = (
    name: string,
    quantity: number,
    price: number,
    category?: string
  ) => {
    const newItem: ShoppingItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name,
      completed: false,
      quantity,
      price,
      category,
    };
    void persistList([...items, newItem]);
  };

  const handleToggleCatalogItem = (name: string, category: string) => {
    const existing = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      void persistList(items.filter((item) => item.id !== existing.id));
    } else {
      void persistList([
        ...items,
        {
          id: Date.now() + Math.floor(Math.random() * 1000),
          name,
          completed: false,
          quantity: 1,
          price: 0,
          category,
        },
      ]);
    }
  };

  const handleToggleItem = (id: number) => {
    void persistList(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleUpdateItem = (id: number, quantity: number, price: number) => {
    void persistList(
      items.map((item) =>
        item.id === id ? { ...item, quantity, price } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setExitingItemIds((prev) => [...prev, id]);
    setTimeout(() => {
      void persistList(items.filter((item) => item.id !== id));
      setExitingItemIds((prev) => prev.filter((itemId) => itemId !== id));
    }, 200);
  };

  const handleClearList = () => {
    setExitingItemIds(items.map((item) => item.id));
    setTimeout(() => {
      void persistList([]);
      setExitingItemIds([]);
    }, 200);
  };

  const sortedItems = useMemo(() => {
    const uncompleted = items.filter((item) => !item.completed);
    const completed = items.filter((item) => item.completed);

    const compareFn = (a: ShoppingItem, b: ShoppingItem) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'category') {
        const catA = a.category || t.othersCategory;
        const catB = b.category || t.othersCategory;
        const catDiff = catA.localeCompare(catB);
        return catDiff !== 0 ? catDiff : a.name.localeCompare(b.name);
      }
      return 0;
    };

    if (sortBy !== 'default') {
      uncompleted.sort(compareFn);
      completed.sort(compareFn);
    }

    return [...uncompleted, ...completed];
  }, [items, sortBy, t.othersCategory]);

  const totalPrice = useMemo(() => {
    return items
      .filter((item) => !item.completed)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const completedTotal = useMemo(() => {
    return items
      .filter((item) => item.completed)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const completedCount = useMemo(
    () => items.filter((item) => item.completed).length,
    [items]
  );

  const isSyncedCloud = Boolean(db && user && user.uid !== 'local-demo-user');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <Header
        page={page}
        setPage={setPage}
        itemCount={items.length}
        completedCount={completedCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {!user && !sharedListDoc ? (
          <LoginScreen
            onGoogleLogin={handleGoogleLogin}
            onContinueLocalDemo={handleContinueLocalDemo}
            isLoading={authLoading}
            error={authError}
          />
        ) : (
          <>
            {(page === 'list' || page === 'categories') && (
              <div className="mb-6">
                <MonthlyBar
                  monthKey={activeList.monthKey}
                  onChangeMonth={setMonthKey}
                  shareId={activeList.id}
                  isSharedView={Boolean(sharedListIdParam && sharedListDoc)}
                  sharedOwnerName={sharedListDoc?.ownerName}
                  onExitSharedView={handleExitSharedView}
                  isSyncedCloud={isSyncedCloud}
                />
              </div>
            )}

            {page === 'list' && (
              <div className="space-y-6 animate-fade-in">
                <AddItemForm
                  onAddItem={handleAddItem}
                  previousPrices={previousPrices}
                />
                <ShoppingList
                  items={sortedItems}
                  previousPrices={previousPrices}
                  hasPreviousMonthItems={Boolean(latestPriorList)}
                  onImportPreviousMonth={handleImportPreviousMonth}
                  onToggleItem={handleToggleItem}
                  onUpdateItem={handleUpdateItem}
                  onRemoveItem={handleRemoveItem}
                  onClearList={handleClearList}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalPrice={totalPrice}
                  completedTotal={completedTotal}
                  exitingItemIds={exitingItemIds}
                  onGoToCategories={() => setPage('categories')}
                />
              </div>
            )}

            {page === 'categories' && (
              <Categories
                items={items}
                onToggleCatalogItem={handleToggleCatalogItem}
                onGoToList={() => setPage('list')}
              />
            )}

            {page === 'about' && <About />}
            {page === 'donation' && <Donation />}
          </>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
