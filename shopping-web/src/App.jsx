// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// Se estiver usando proxy do Vite, deixe '/api'.
// Caso contrário, use 'http://127.0.0.1:8000'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 8000,
  withCredentials: false,
});

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", unit_price: "", quantity: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);

  // estado de edição inline
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ unit_price: "", quantity: "" });
  const [loadingEdit, setLoadingEdit] = useState(false);

  const fetchItems = async () => {
    const { data } = await api.get("/items");
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const total = useMemo(() => {
    return items.reduce((acc, it) => acc + it.total, 0);
  }, [items]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoadingAdd(true);
    try {
      const body = { name: form.name.trim() };

      if (form.unit_price !== "") {
        body.unit_price = parseFloat(form.unit_price);
      }
      if (form.quantity !== "") {
        body.quantity = parseInt(form.quantity);
      }

      await api.post("/items", body);
      setForm({ name: "", unit_price: "", quantity: "" });
      await fetchItems();
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
    try {
      const body = {};
      if (editForm.unit_price !== "") {
        body.unit_price = parseFloat(editForm.unit_price);
      }
      if (editForm.quantity !== "") {
        body.quantity = parseInt(editForm.quantity);
      }
      // Se nada mudou, não manda patch
      if (Object.keys(body).length === 0) {
        cancelEdit();
        return;
      }
      await api.patch(`/items/${id}`, body);
      await fetchItems();
      cancelEdit();
    } finally {
      setLoadingEdit(false);
    }
  };

  const removeItem = async (id) => {
    await api.delete(`/items/${id}`);
    await fetchItems();
  };

  const updateQtyQuick = async (id, nextQty) => {
    if (nextQty < 1) return;
    await api.patch(`/items/${id}`, { quantity: nextQty });
    await fetchItems();
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Lista de Compras</h1>

      {/* Formulário de adição (preço/quantidade opcionais) */}
      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: 8,
          gridTemplateColumns: "1fr 140px 120px 140px",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <input
          placeholder="Nome do item (obrigatório)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Preço (R$) opcional"
          value={form.unit_price}
          onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
        />
        <input
          type="number"
          min="1"
          placeholder="Qtd (opcional)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <button disabled={loadingAdd}>
          {loadingAdd ? "Adicionando..." : "Adicionar"}
        </button>
      </form>

      {/* Lista */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((it) => {
          const isEditing = editingId === it.id;
          return (
            <li
              key={it.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 160px 220px",
                gap: 8,
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Nome do item */}
              <div>
                <strong>{it.name}</strong>
              </div>

              {/* Preço unitário */}
              <div>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editForm.unit_price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, unit_price: e.target.value })
                    }
                    placeholder="Preço (R$)"
                  />
                ) : (
                  <span>R$ {it.unit_price.toFixed(2)}</span>
                )}
              </div>

              {/* Quantidade (com atalho +/- quando não está editando) */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={editForm.quantity}
                    onChange={(e) =>
                      setEditForm({ ...editForm, quantity: e.target.value })
                    }
                    placeholder="Qtd"
                    style={{ width: 80 }}
                  />
                ) : (
                  <>
                    <button onClick={() => updateQtyQuick(it.id, it.quantity - 1)}>
                      -
                    </button>
                    <span>{it.quantity}</span>
                    <button onClick={() => updateQtyQuick(it.id, it.quantity + 1)}>
                      +
                    </button>
                  </>
                )}
              </div>

              {/* Total + ações */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ minWidth: 100, textAlign: "right" }}>
                  R$ {it.total.toFixed(2)}
                </span>

                {isEditing ? (
                  <>
                    <button onClick={() => saveEdit(it.id)} disabled={loadingEdit}>
                      {loadingEdit ? "Salvando..." : "Salvar"}
                    </button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(it)}>Editar</button>
                    <button onClick={() => removeItem(it.id)}>Remover</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <h2 style={{ textAlign: "right", marginTop: 16 }}>
        Total: R$ {total.toFixed(2)}
      </h2>
    </div>
  );
}