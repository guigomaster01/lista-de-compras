import axios from "axios";
export const api = axios.create({
 // baseURL: "http://127.0.0.1:8000", // URL do backend em produção
    // baseURL: "/api", // URL do backend em desenvolvimento (com proxy)
    baseURL: "https://lista-de-compras-ten-hazel.vercel.app/", // URL do backend em produção
    timeout: 8000, // 8 segundos
    withCredentials: false, // se precisar enviar cookies
});