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
import { ImportPreviousModal } from './components/ImportPreviousModal';
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

const sanitizeListForFirestore = (
  list: MonthlyShoppingList,
  user: AuthUserDisplay | null,
  fallbackName: string
): MonthlyShoppingList => {
  const isRealUser = Boolean(user && user.uid !== 'local-demo-user');
  const resolvedOwnerId =
    isRealUser && (!list.ownerId || list.ownerId === 'local-demo-user')
      ? user!.uid
      : list.ownerId || user?.uid || 'local-demo-user';

  const resolvedOwnerName =
    isRealUser &&
    (!list.ownerName ||
      list.ownerName === 'Conta Local' ||
      list.ownerName === 'Local Account' ||
      list.ownerName === 'Cuenta Local' ||
      list.ownerName === '本地账户')
      ? user!.displayName || user!.email || fallbackName
      : list.ownerName || user?.displayName || fallbackName;

  const cleanItems: ShoppingItem[] = (list.items || []).map((item) => {
    const clean: ShoppingItem = {
      id: item.id,
      name: item.name,
      completed: Boolean(item.completed),
      quantity: item.quantity,
      price: item.price,
    };
    if (item.category) {
      clean.category = item.category;
    }
    return clean;
  });

  return {
    id: list.id,
    ownerId: resolvedOwnerId,
    ownerName: resolvedOwnerName,
    ownerPhoto: list.ownerPhoto ?? user?.photoURL ?? null,
    monthKey: list.monthKey,
    items: cleanItems,
    createdAt: list.createdAt || new Date().toISOString(),
    updatedAt: list.updatedAt || new Date().toISOString(),
  };
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
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

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
        const remoteLists: Record<string, MonthlyShoppingList> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as MonthlyShoppingList;
          if (data.monthKey) {
            remoteLists[data.monthKey] = data;
          }
        });

        setMonthlyLists((prev) => {
          const merged = { ...prev, ...remoteLists };
          // Sobe automaticamente para o Firestore qualquer lista local que ainda não esteja na nuvem
          for (const [mKey, localList] of Object.entries(prev)) {
            if (!remoteLists[mKey] && localList && localList.items?.length > 0) {
              const sanitized = sanitizeListForFirestore(
                localList,
                user,
                t.userFallback
              );
              merged[mKey] = sanitized;
              void setDoc(doc(db, 'shoppingLists', sanitized.id), sanitized).catch(
                (err) => {
                  console.error('Erro ao sincronizar lista local para o Firestore:', err);
                }
              );
            }
          }
          return merged;
        });
      },
      (err) => {
        console.error('Erro ao buscar listas do Firestore:', err);
      }
    );

    return () => unsubscribe();
  }, [user, t.userFallback]);

  // Se houver ?lista=<shareId> na URL, escuta esse documento específico em tempo real
  useEffect(() => {
    if (!sharedListIdParam) {
      setSharedListDoc(null);
      return;
    }

    const foundLocal = (Object.values(monthlyLists) as MonthlyShoppingList[]).find(
      (list) => list.id === sharedListIdParam
    );
    if (foundLocal) {
      setSharedListDoc(foundLocal);
    }

    if (!db) {
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
  const { previousPrices, priorListsWithItems } = useMemo(() => {
    const map: Record<string, PreviousPriceInfo> = {};
    const otherMonthKeys = Object.keys(monthlyLists)
      .filter((k) => k !== activeList.monthKey)
      .sort((a, b) => b.localeCompare(a)); // Mais recente primeiro

    const nonEmptyLists: MonthlyShoppingList[] = [];

    for (const mKey of otherMonthKeys) {
      const list = monthlyLists[mKey];
      if (!list || !list.items || list.items.length === 0) continue;

      nonEmptyLists.push(list);

      if (mKey < activeList.monthKey) {
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
    }

    return { previousPrices: map, priorListsWithItems: nonEmptyLists };
  }, [monthlyLists, activeList.monthKey]);

  const persistList = useCallback(
    async (updatedItems: ShoppingItem[]) => {
      const rawUpdated: MonthlyShoppingList = {
        ...activeList,
        items: updatedItems,
        updatedAt: new Date().toISOString(),
      };

      const sanitized = sanitizeListForFirestore(
        rawUpdated,
        user,
        t.userFallback
      );

      if (sharedListIdParam && sharedListDoc) {
        setSharedListDoc(sanitized);
      } else {
        setMonthlyLists((prev) => ({
          ...prev,
          [sanitized.monthKey]: sanitized,
        }));
      }

      if (db && user && user.uid !== 'local-demo-user') {
        try {
          await setDoc(doc(db, 'shoppingLists', sanitized.id), sanitized);
        } catch (err) {
          console.error('Erro ao salvar lista no Firestore:', err);
        }
      }
    },
    [activeList, sharedListIdParam, sharedListDoc, user, t.userFallback]
  );

  const handleEnsureActiveListSynced = useCallback(() => {
    if (!db || !user || user.uid === 'local-demo-user') return;
    const sanitized = sanitizeListForFirestore(activeList, user, t.userFallback);
    void setDoc(doc(db, 'shoppingLists', sanitized.id), sanitized).catch((err) => {
      console.error('Erro ao sincronizar lista compartilhada no Firestore:', err);
    });
  }, [activeList, user, t.userFallback]);

  const handleImportItemsFromPrevious = (
    selectedItems: ShoppingItem[],
    keepPrices: boolean
  ) => {
    if (selectedItems.length === 0) return;
    const existingNames = new Set(
      activeList.items.map((i) => i.name.trim().toLowerCase())
    );
    const newImportedItems: ShoppingItem[] = selectedItems
      .filter((item) => !existingNames.has(item.name.trim().toLowerCase()))
      .map((item, idx) => ({
        id: Date.now() + idx + Math.floor(Math.random() * 1000),
        name: item.name,
        ...(item.category ? { category: item.category } : {}),
        quantity: item.quantity,
        price: keepPrices ? item.price : 0,
        completed: false,
      }));

    if (newImportedItems.length > 0) {
      void persistList([...activeList.items, ...newImportedItems]);
    }
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
      ...(category ? { category } : {}),
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
                  onShareList={handleEnsureActiveListSynced}
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
                  hasPreviousMonthItems={priorListsWithItems.length > 0}
                  onOpenImportModal={() => setIsImportModalOpen(true)}
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
                <ImportPreviousModal
                  isOpen={isImportModalOpen}
                  onClose={() => setIsImportModalOpen(false)}
                  priorLists={priorListsWithItems}
                  currentItems={items}
                  onImportItems={handleImportItemsFromPrevious}
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
