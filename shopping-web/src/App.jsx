// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { getStore } from "./storage"; // retorna localStore ou httpStore conforme o modo

const fmtBRL = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(Number.isFinite(n) ? n : 0);

export default function App() {
  // ---------- Modo de armazenamento ----------
  const [mode, setMode] = useState(() => localStorage.getItem("shopping.mode") || "local");
  const [modeLoaded, setModeLoaded] = useState(false);
  const store = useMemo(() => getStore(mode), [mode]);

  // ---------- Modo compacto (para telas pequenas) ----------
  const [compact, setCompact] = useState(() => localStorage.getItem("shopping.compact") === "1");
  const sz = useMemo(() => {
    // classes que mudam conforme compacto
    return compact
      ? {
          headerPy: "py-2",
          sectionPad: "p-3",
          cardPad: "p-3",
          gap: "gap-2",
          inputH: "h-9",
          btnH: "h-9",
          btnPadX: "px-3",
          textBase: "text-sm",
          textSmall: "text-xs",
        }
      : {
          headerPy: "py-3",
          sectionPad: "p-4",
          cardPad: "p-4",
          gap: "gap-3",
          inputH: "h-10",
          btnH: "h-10",
          btnPadX: "px-4",
          textBase: "text-sm",
          textSmall: "text-xs",
        };
  }, [compact]);

  // ---------- Estado da lista / formulários ----------
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", unit_price: "", quantity: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ unit_price: "", quantity: "" });
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [error, setError] = useState("");

  // ---------- Persistência de preferências ----------
  useEffect(() => {
    localStorage.setItem("shopping.mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("shopping.compact", compact ? "1" : "0");
  }, [compact]);

  useEffect(() => {
    setModeLoaded(true);
  }, []);

  // ---------- Data loading ----------
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

  // ---------- Ações ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoadingAdd(true);
    setError("");
    try {
      const body = { name: form.name.trim() };
      if (form.unit_price !== "") body.unit_price = parseFloat(form.unit_price);
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

  // ---------- Classes utilitárias ----------
  const inputClass = `${sz.inputH} w-full rounded-xl border border-black/10 px-3 ${sz.textBase} outline-none focus:ring-2 focus:ring-indigo-500`;
  const btnPrimary = `${sz.btnH} rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white ${sz.btnPadX} ${sz.textBase} font-medium transition-colors`;
  const btnGhost = `${sz.btnH} rounded-xl border border-black/10 ${sz.btnPadX} ${sz.textBase} hover:bg-black/5 transition-colors`;
  const btnDanger = `${sz.btnH} rounded-xl bg-rose-600 hover:bg-rose-700 text-white ${sz.btnPadX} ${sz.textBase}`;

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-black/5">
        <div className={`max-w-3xl mx-auto px-4 ${sz.headerPy} flex items-center justify-between gap-3`}>
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">Lista de Compras</h1>

          {/* Toggle Local/Nuvem + Compacto */}
          <div className="flex items-center gap-3">
            <div className="text-sm flex items-center gap-2">
              <label className="font-medium">Salvar em:</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className={`h-9 rounded-lg border border-black/10 px-2 ${sz.textBase} outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="local">Meu dispositivo (local)</option>
                <option value="api">Nuvem (minha conta)</option>
              </select>
            </div>

            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={compact}
                onChange={(e) => setCompact(e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              Modo compacto
            </label>
          </div>

          <span className={`${sz.textBase} text-gray-500`}>
            {items.length} itens
          </span>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        {/* FORM */}
        <section className={`bg-white border border-black/5 rounded-2xl ${sz.sectionPad} shadow-sm`}>
          <h2 className="text-base font-medium mb-2">Adicionar item</h2>
          <form
            onSubmit={onSubmit}
            className={`grid ${sz.gap} md:grid-cols-[1fr,160px,120px,120px] items-start`}
          >
            <input
              className={inputClass}
              placeholder="Nome do item (obrigatório)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              min="0"
              className={inputClass}
              placeholder="Preço (R$) opcional"
              value={form.unit_price}
              onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
            />
            <input
              type="number"
              min="1"
              className={inputClass}
              placeholder="Qtd (opcional)"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <button disabled={loadingAdd} className={btnPrimary}>
              {loadingAdd ? "Adicionando..." : "Adicionar"}
            </button>
          </form>
          {error && (
            <p className={`mt-2 ${sz.textBase} text-red-600`}>{error}</p>
          )}
        </section>

        {/* LISTA */}
        <section className="space-y-2">
          {items.length === 0 && (
            <div className={`text-center ${sz.textBase} text-gray-500 border border-dashed border-black/10 rounded-xl bg-white ${sz.sectionPad}`}>
              Nenhum item por enquanto. Adicione acima 👆
            </div>
          )}

          {items.map((it) => {
            const isEditing = editingId === it.id;
            return (
              <article
                key={it.id}
                className={`bg-white border border-black/5 rounded-2xl ${sz.cardPad} shadow-sm hover:shadow transition-shadow`}
              >
                <div className={`grid grid-cols-1 ${sz.gap} md:grid-cols-[1fr,160px,170px,1fr] md:items-center`}>
                  {/* Nome */}
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{it.name}</h3>
                    <p className={`${sz.textSmall} text-gray-500 mt-0.5`}>
                      Total do item: <strong>{fmtBRL(it.total)}</strong>
                    </p>
                  </div>

                  {/* Preço unitário */}
                  <div className="flex items-center gap-2">
                    <span className={`${sz.textSmall} text-gray-500`}>Preço</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editForm.unit_price}
                        onChange={(e) => setEditForm({ ...editForm, unit_price: e.target.value })}
                        className={inputClass}
                        placeholder="R$ 0,00"
                      />
                    ) : (
                      <span className="font-medium">{fmtBRL(it.unit_price)}</span>
                    )}
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center gap-2">
                    <span className={`${sz.textSmall} text-gray-500`}>Qtd</span>
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={editForm.quantity}
                        onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                        className={`${inputClass} w-24`}
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

                  {/* Ações */}
                  <div className="flex justify-end gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(it.id)}
                          className={btnPrimary}
                          disabled={loadingEdit}
                        >
                          {loadingEdit ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className={btnGhost}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(it)}
                          className={btnGhost}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => removeItem(it.id)}
                          className={btnDanger}
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

      {/* FOOTER */}
      <footer className="sticky bottom-0 border-t border-black/5 bg-white/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between pb-[env(safe-area-inset-bottom)]">
          <span className={`${sz.textBase} text-gray-500`}>Total da compra</span>
          <span className="text-lg font-semibold">{fmtBRL(total)}</span>
        </div>
      </footer>
    </div>
  );
}