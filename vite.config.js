import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: [
      'wishlist-production-6091.up.railway.app',
      '*.up.railway.app',
      '*.railway.app'
    ]
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
})
