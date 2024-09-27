import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {config} from 'dotenv'
config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': process.env.VITE_API_BASE_URL!
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  }
})
