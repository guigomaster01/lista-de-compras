// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { getStore } from "../storage";

const fmtBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(Number.isFinite(n) ? n : 0);

export default function Home() {
  // armazenamento
  const [mode] = useState(() => localStorage.getItem("shopping.mode") || "local");
  const store = useMemo(() => getStore(mode), [mode]);

  // compacto
  const [compact, setCompact] = useState(
    () => localStorage.getItem("shopping.compact") === "1"
  );
  const sz = useMemo(
    () =>
      compact
        ? { sectionPad: "p-3", cardPad: "p-3", gap: "gap-2", textBase: "text-sm", textSmall: "text-xs", ctrlSize: "h-9 px-3" }
        : { sectionPad: "p-4", cardPad: "p-4", gap: "gap-3", textBase: "text-sm", textSmall: "text-xs", ctrlSize: "" },
    [compact]
  );

  // estado
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", unit_price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ unit_price: "", quantity: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("shopping.compact", compact ? "1" : "0");
  }, [compact]);

// logo após outros useState:
const [sortAZ, setSortAZ] = useState(() => {
  const v = localStorage.getItem("shopping.sortAZ");
  return v ? v === "1" : true; // padrão: ligado
});

// persiste a preferência
useEffect(() => {
  localStorage.setItem("shopping.sortAZ", sortAZ ? "1" : "0");
}, [sortAZ]);

// lista (opcionalmente) ordenada
const sortedItems = useMemo(() => {
  if (!Array.isArray(items)) return [];
  if (!sortAZ) return items;
  return [...items].sort((a, b) =>
    (a.name || "").localeCompare(b.name || "", "pt-BR", { sensitivity: "base" })
  );
}, [items, sortAZ]);

  // data
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
    fetchItems();
  }, [store]);

  const total = useMemo(
    () => (Array.isArray(items) ? items.reduce((a, it) => a + (Number(it.total) || 0), 0) : 0),
    [items]
  );

  // ações
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoadingAdd(true);
    setError("");
    try {
      const body = { name: form.name.trim() };
      if (form.unit_price !== "") body.unit_price = Number(form.unit_price);
      if (form.quantity !== "") body.quantity = parseInt(form.quantity);
      await store.create(body);
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
  const cancelEdit = () => { setEditingId(null); setEditForm({ unit_price: "", quantity: "" }); };

  const saveEdit = async (id) => {
    setLoadingEdit(true);
    setError("");
    try {
      const patch = {};
      if (editForm.unit_price !== "") patch.unit_price = Number(editForm.unit_price);
      if (editForm.quantity !== "") patch.quantity = parseInt(editForm.quantity);
      if (!Object.keys(patch).length) return cancelEdit();
      await store.patch(id, patch);
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
      await store.remove(id);
      await fetchItems();
    } catch (e) {
      console.error(e);
      setError("Falha ao remover item.");
    }
  };

  const updateQtyQuick = async (id, nextQty) => {
    if (nextQty < 1) return;
    setError("");
    try {
      await store.patch(id, { quantity: nextQty });
      await fetchItems();
    } catch (e) {
      console.error(e);
      setError("Falha ao atualizar quantidade.");
    }
  };

  return (
    <>
      {/* Barra de opções da Home (modo compacto) */}
      <div className="flex items-center justify-end mb-3 gap-4">
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={compact}
            onChange={(e) => setCompact(e.target.checked)}
            className="h-4 w-4 accent-indigo-600"
          />
          Modo compacto
        </label>

        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={sortAZ}
            onChange={(e) => setSortAZ(e.target.checked)}
            className="h-4 w-4 accent-indigo-600"
          />
          Ordenar A→Z
        </label>
      </div>


      {/* Formulário */}
      <section className={`card ${sz.sectionPad}`}>
        <h2 className="text-base font-medium mb-2">Adicionar item</h2>
        <form onSubmit={onSubmit} className={`grid ${sz.gap} md:grid-cols-[1fr,160px,120px,120px] items-start`}>
          <input
            className={`input ${sz.textBase} ${sz.ctrlSize}`}
            placeholder="Nome do item (obrigatório)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            min="0"
            className={`input ${sz.textBase} ${sz.ctrlSize}`}
            placeholder="Preço (R$) opcional"
            value={form.unit_price}
            onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
          />
          <input
            type="number"
            min="1"
            className={`input ${sz.textBase} ${sz.ctrlSize}`}
            placeholder="Qtd (opcional)"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <button disabled={loadingAdd} className={`btn-primary ${sz.ctrlSize}`}>
            {loadingAdd ? "Adicionando..." : "Adicionar"}
          </button>
        </form>
        {error && <p className={`mt-2 ${sz.textBase} text-red-600`}>{error}</p>}
      </section>

      {/* Lista */}
      <section className="space-y-2 mt-5">
        {sortedItems.map((it) => it.id).length === 0 && (
          <div className={`text-center ${sz.textBase} text-gray-500 border border-dashed border-black/10 rounded-xl bg-white ${sz.sectionPad}`}>
            Nenhum item por enquanto. Adicione acima 👆
          </div>
        )}

        {sortedItems.map((it) => {
          const isEditing = editingId === it.id;
          return (
            <article key={it.id} className={`card ${sz.cardPad} hover:shadow transition-shadow`}>
              <div className={`grid grid-cols-1 ${sz.gap} md:grid-cols-[1fr,160px,170px,1fr] md:items-center`}>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{it.name}</h3>
                  <p className={`${sz.textSmall} text-gray-500 mt-0.5`}>
                    Total do item: <strong>{fmtBRL(it.total)}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`${sz.textSmall} text-gray-500`}>Preço</span>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editForm.unit_price}
                      onChange={(e) => setEditForm({ ...editForm, unit_price: e.target.value })}
                      className={`input ${sz.textBase} ${sz.ctrlSize}`}
                      placeholder="R$ 0,00"
                    />
                  ) : (
                    <span className="font-medium">{fmtBRL(it.unit_price)}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`${sz.textSmall} text-gray-500`}>Qtd</span>
                  {isEditing ? (
                    <input
                      type="number"
                      min="1"
                      value={editForm.quantity}
                      onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                      className={`input w-24 ${sz.textBase} ${sz.ctrlSize}`}
                      placeholder="1"
                    />
                  ) : (
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => updateQtyQuick(it.id, it.quantity - 1)}
                        className="h-8 w-8 rounded-lg border border-black/10 hover:bg-black/5 active:scale-95 transition"
                        title="Diminuir"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center">{it.quantity}</span>
                      <button
                        onClick={() => updateQtyQuick(it.id, it.quantity + 1)}
                        className="h-8 w-8 rounded-lg border border-black/10 hover:bg-black/5 active:scale-95 transition"
                        title="Aumentar"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(it.id)} className={`btn-primary ${sz.ctrlSize}`} disabled={loadingEdit}>
                        {loadingEdit ? "Salvando..." : "Salvar"}
                      </button>
                      <button onClick={cancelEdit} className={`btn-ghost ${sz.ctrlSize}`}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(it)} className={`btn-ghost ${sz.ctrlSize}`}>
                        Editar
                      </button>
                      <button onClick={() => removeItem(it.id)} className={`btn-danger ${sz.ctrlSize}`}>
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

      {/* Total fixo */}
      <div className="sticky bottom-0 border-t border-black/5 bg-white/80 backdrop-blur mt-5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between pb-[env(safe-area-inset-bottom)]">
          <span className={`${sz.textBase} text-gray-500`}>Total da compra</span>
          <span className="text-lg font-semibold">{fmtBRL(total)}</span>
        </div>
      </div>
    </>
  );
}