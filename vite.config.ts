import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          react: ['react', 'react-dom'],
          routing: ['react-router-dom', 'react-lazyload'],
          reactQuery: ['@tanstack/react-query'],

          // State & Form
          state: ['@reduxjs/toolkit', 'react-redux'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Supabase
          supabase: ['@supabase/supabase-js'],

          // Radix UI (grouped together)
          dropmenu: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
          radix: [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ],

          // UI & Icons
          reacticons: ['react-icons'],
          lucide: [
            'lucide-react',
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
          ],

          // Time & Utils
          utils: ['dayjs', 'relative-time'],

          // Animation / Carousel
          carousel: ['embla-carousel-react'],

          // Other
          theming: ['next-themes'],
          head: ['react-helmet-async'],
          payment: ['react-paystack'],
          sitemap: ['sitemap'],
        },
      },
    },
    target: 'es2020',
  },
})
