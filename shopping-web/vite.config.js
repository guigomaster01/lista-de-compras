import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // já que seu Vite rodou nessa porta - 
    // no macbook se tiver usando liste com o comando:
    //  lsof -i :5173 e depois 
    // kill -9 <PID>
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },
})
