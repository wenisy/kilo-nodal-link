import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kilo-nodal-link/',
  build: {
    outDir: 'dist',
  },
})
