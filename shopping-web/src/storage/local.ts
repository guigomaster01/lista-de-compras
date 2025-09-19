export type Item = {
  id: string;
  name: string;
  unit_price: number;
  quantity: number;
  total: number;
  done: boolean;
  updatedAt: number;
};

const KEY = "shopping.items.v1";

function load(): Item[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export const localStore = {
  async list(): Promise<Item[]> {
    return load();
  },
  async create(data: { name: string; unit_price?: number; quantity?: number; done?: boolean }): Promise<Item> {
    const items = load();
    const unit = Number.isFinite(data.unit_price as number) ? Number(data.unit_price) : 0;
    const qty = Number.isFinite(data.quantity as number) ? Number(data.quantity) : 1;
    const it: Item = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      unit_price: Number(unit.toFixed(2)),
      quantity: qty,
      total: Number((unit * qty).toFixed(2)),
      done: !!data.done,
      updatedAt: Date.now(),
    };
    items.unshift(it);
    save(items);
    return it;
  },
  async patch(id: string, patch: Partial<Pick<Item, "name" | "unit_price" | "quantity" | "done">>): Promise<Item> {
    const items = load();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) throw new Error("not found");
    const cur = items[idx];
    const unit = patch.unit_price != null ? Number(patch.unit_price) : cur.unit_price;
    const qty  = patch.quantity    != null ? Number(patch.quantity)    : cur.quantity;
    const next: Item = {
      ...cur,
      ...patch,
      unit_price: Number(unit.toFixed(2)),
      quantity: qty,
      total: Number((unit * qty).toFixed(2)),
      updatedAt: Date.now(),
    };
    items[idx] = next;
    save(items);
    return next;
  },
  async remove(id: string): Promise<void> {
    const items = load().filter(i => i.id !== id);
    save(items);
  },
  async total(): Promise<number> {
    return load().reduce((acc, i) => acc + i.total, 0);
  },
  async clearAll(): Promise<void> {
    save([]);
  }
};
