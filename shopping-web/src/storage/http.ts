import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
});

export const httpStore = {
  async list() {
    const { data } = await api.get("/items");
    return Array.isArray(data) ? data : [];
  },
  async create(body: { name: string; unit_price?: number; quantity?: number; done?: boolean }) {
    const { data } = await api.post("/items", body);
    return data;
  },
  async patch(id: string, patch: any) {
    const { data } = await api.patch(`/items/${id}`, patch);
    return data;
  },
  async remove(id: string) {
    await api.delete(`/items/${id}`);
  },
  async total() {
    const { data } = await api.get("/total");
    return Number(data?.total ?? 0);
  },
  async clearAll() {
    
  }
};
