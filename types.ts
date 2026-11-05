export type Language = 'pt' | 'en' | 'es' | 'zh';

export type PageType = 'list' | 'categories' | 'about' | 'donation';

export interface ShoppingItem {
  id: number;
  name: string;
  completed: boolean;
  quantity: number;
  price: number;
  category?: string;
}

export interface PreviousPriceInfo {
  price: number;
  monthKey: string;
}

export interface MonthlyShoppingList {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerPhoto?: string | null;
  monthKey: string; // Formato YYYY-MM, ex: "2026-11"
  items: ShoppingItem[];
  updatedAt: string;
  createdAt: string;
}

export interface CatalogSubgroup {
  label?: string;
  items: string[];
}

export interface CatalogCategory {
  id: string;
  title: string;
  subtitle?: string;
  groups: CatalogSubgroup[];
}
