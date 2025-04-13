import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  },
  optimizeDeps: {
    exclude: ['mysql2', 'socket.io-client']
  },
  build: {
    rollupOptions: {
      external: ['mysql2', 'express', 'socket.io', 'cors'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'three']
        }
      }
    }
  }
})
