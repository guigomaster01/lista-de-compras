// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { getStore } from "./storage"; // <<-- use o index que retorna local/http conforme modo

const fmtBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.isFinite(n) ? n : 0
  );

export default function App() {
  // modo persiste no localStorage; default "local"
  const [mode, setMode] = useState(() => localStorage.getItem("shopping.mode") || "local");
  const [modeLoaded, setModeLoaded] = useState(false);
  const store = useMemo(() => getStore(mode), [mode]); // provider local OU http

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", unit_price: "", quantity: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ unit_price: "", quantity: "" });
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("shopping.mode", mode);
  }, [mode]);

  useEffect(() => {
    setModeLoaded(true);
  }, []);

  const fetchItems = async () => {
    setError("");
    try {
      const data = await store.list();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setItems([]);
      setError("Não foi possível carregar os itens.");
    }
  };

  useEffect(() => {
    if (!modeLoaded) return;
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, store, modeLoaded]);

  const total = useMemo(
    () => (Array.isArray(items) ? items.reduce((acc, it) => acc + (Number(it.total) || 0), 0) : 0),
    [items]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoadingAdd(true);
    setError("");
    try {
      const body = { name: form.name.trim() };
      if (form.unit_price !== "") body.unit_price = parseFloat(form.unit_price);
      if (form.quantity !== "") body.quantity = parseInt(form.quantity);
      await store.create(body);           // <<-- provider
      setForm({ name: "", unit_price: "", quantity: "" });
      await fetchItems();
    } catch (e) {
      console.error(e);
      setError("Falha ao adicionar item.");
    } finally {
      setLoadingAdd(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      unit_price: item.unit_price?.toFixed(2) ?? "",
      quantity: String(item.quantity ?? 1),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ unit_price: "", quantity: "" });
  };

  const saveEdit = async (id) => {
    setLoadingEdit(true);
    setError("");
    try {
      const patch = {};
      if (editForm.unit_price !== "") patch.unit_price = parseFloat(editForm.unit_price);
      if (editForm.quantity !== "") patch.quantity = parseInt(editForm.quantity);
      if (Object.keys(patch).length === 0) return cancelEdit();

      await store.patch(id, patch);       // <<-- provider
      await fetchItems();
      cancelEdit();
    } catch (e) {
      console.error(e);
      setError("Falha ao salvar alterações.");
    } finally {
      setLoadingEdit(false);
    }
  };

  const removeItem = async (id) => {
    setError("");
    try {
      await store.remove(id);             // <<-- provider
      await fetchItems();
    } catch {
      setError("Falha ao remover item.");
    }
  };

  const updateQtyQuick = async (id, nextQty) => {
    if (nextQty < 1) return;
    setError("");
    try {
      await store.patch(id, { quantity: nextQty }); // <<-- provider
      await fetchItems();
    } catch {
      setError("Falha ao atualizar quantidade.");
    }
  };

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 bg-white/80 dark:bg-neutral-900/80 border-b border-black/5 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight">Lista de Compras</h1>

          {/* Toggle Local/Nuvem */}
          <div className="text-sm flex items-center gap-2">
            <label className="font-medium">Salvar em:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-2 py-1"
            >
              <option value="local">Meu dispositivo (local)</option>
              <option value="api">Nuvem (minha conta)</option>
            </select>
          </div>

          <span className="text-sm text-gray-500 dark:text-neutral-400">
            {items.length} itens
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Card do formulário */}
        <section className="bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-sm">
          <h2 className="text-base font-medium mb-3">Adicionar item</h2>
          <form
            onSubmit={onSubmit}
            className="grid gap-3 md:grid-cols-[1fr,160px,120px,120px] items-start"
          >
            <input
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nome do item (obrigatório)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              min="0"
              className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Preço (R$) opcional"
              value={form.unit_price}
              onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
            />
            <input
              type="number"
              min="1"
              className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Qtd (opcional)"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <button
              disabled={loadingAdd}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 font-medium transition-colors"
            >
              {loadingAdd ? "Adicionando..." : "Adicionar"}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </section>

        {/* Lista */}
        <section className="space-y-2">
          {items.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-neutral-400 text-center py-8">
              Nenhum item por enquanto. Adicione acima 👆
            </div>
          )}
          {items.map((it) => {
            const isEditing = editingId === it.id;
            return (
              <article
                key={it.id}
                className="bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-sm hover:shadow transition-shadow"
              >
                <div className="grid gap-3 md:grid-cols-[1fr,160px,170px,1fr] md:items-center">
                  {/* Nome */}
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{it.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
                      Total do item: <strong>{fmtBRL(it.total)}</strong>
                    </p>
                  </div>

                  {/* Preço unitário */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-neutral-400">Preço</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editForm.unit_price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, unit_price: e.target.value })
                        }
                        className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="R$ 0,00"
                      />
                    ) : (
                      <span className="font-medium">{fmtBRL(it.unit_price)}</span>
                    )}
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-neutral-400">Qtd</span>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={editForm.quantity}
                        onChange={(e) =>
                          setEditForm({ ...editForm, quantity: e.target.value })
                        }
                        className="w-24 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1"
                      />
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => updateQtyQuick(it.id, it.quantity - 1)}
                          className="h-8 w-8 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                          title="Diminuir"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center">{it.quantity}</span>
                        <button
                          onClick={() => updateQtyQuick(it.id, it.quantity + 1)}
                          className="h-8 w-8 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                          title="Aumentar"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex justify-end gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(it.id)}
                          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium"
                          disabled={loadingEdit}
                        >
                          {loadingEdit ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(it)}
                          className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => removeItem(it.id)}
                          className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-sm"
                        >
                          Remover
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      {/* Total fixo no rodapé */}
      <footer className="sticky bottom-0 border-t border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-neutral-400">Total da compra</span>
          <span className="text-lg font-semibold">{fmtBRL(total)}</span>
        </div>
      </footer>
    </div>
  );
}