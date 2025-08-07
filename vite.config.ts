import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
