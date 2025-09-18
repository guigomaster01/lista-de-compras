import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || "/lista-de-compras"
  // server: {
  //   host: true,       // para acessar via rede local
  //   port: 5173,       // se quer travar nessa porta
  //   strictPort: true, // falha se estiver ocupada
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:8000',
  //       changeOrigin: true,
  //       rewrite: p => p.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
