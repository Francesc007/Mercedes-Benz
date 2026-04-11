import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Permite usar NEXT_PUBLIC_API_URL (misma convención que Next.js / Vercel)
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    proxy: {
      '/api': {
        target: 'https://dashboard-inventario-woad.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})



