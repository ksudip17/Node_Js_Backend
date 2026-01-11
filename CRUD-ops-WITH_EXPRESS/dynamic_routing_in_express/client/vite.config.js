import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '::', // Listen on all IPv6 addresses (and IPv4 via dual-stack)
    port: 5173, // Vite dev server port (your backend is on 8080)
  },
})
