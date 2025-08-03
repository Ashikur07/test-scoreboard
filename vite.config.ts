import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/domjudge/.*': {
        target: 'http://172.16.12.245:12345',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/domjudge/, '')
      }
    }
  }
})