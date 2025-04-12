import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  server: {
    proxy: {
      '/api': 'http://backend:8000',
    },
  },
})


