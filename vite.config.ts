import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/domjudge/.*': {
        target: 'https://realtor-juvenile-those-vacancies.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/domjudge/, '')
      }
    }
  }
})