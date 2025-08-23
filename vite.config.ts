import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
// @ts-expect-error - typings not exported properly by critters
import type { Options } from 'critters/src/index.d.ts'
// @ts-ignore
import Critters from 'critters'

function viteCritters() {
  return {
    name: 'vite-plugin-critters-custom',
    apply: 'build' as const,
    async writeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html')

      if (!fs.existsSync(indexPath)) {
        console.warn(
          `[vite-plugin-critters] index.html not found at ${indexPath}`
        )
        return
      }

      const html = fs.readFileSync(indexPath, 'utf-8')

      const critters = new Critters({
        preload: 'swap',
        inlineFonts: true,
        pruneSource: true,
      } as Options)

      try {
        const output = await critters.process(html)
        fs.writeFileSync(indexPath, output)
      } catch (err) {
        console.error(`[vite-plugin-critters] Failed to process HTML`, err)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), viteCritters()],
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
          react: ['react', 'react-dom', 'sonner', 'react-helmet-async'],
          state: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom', 'react-lazyload'],
          reactQuery: ['@tanstack/react-query'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Supabase
          supabase: ['@supabase/supabase-js'],

          // Radix UI (grouped together)
          slot: [
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-separator',
            '@radix-ui/react-navigation-menu',
          ],
          avatar: ['@radix-ui/react-avatar'],
          dropmenu: ['@radix-ui/react-dropdown-menu'],
          dialog: ['@radix-ui/react-alert-dialog', '@radix-ui/react-dialog'],
          form: [
            '@radix-ui/react-select',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-slider',
          ],
          tabs: ['@radix-ui/react-tabs'],

          // UI & Icons
          reacticons: ['react-icons'],
          lucide: ['lucide-react'],
          cn: ['clsx', 'class-variance-authority', 'tailwind-merge'],

          // Time & Utils
          utils: ['dayjs', 'relative-time'],

          // Animation / Carousel
          carousel: ['embla-carousel-react'],

          // Other
          theming: ['next-themes'],
          payment: ['react-paystack'],
          sitemap: ['sitemap'],
        },
      },
    },
    target: 'es2020',
    cssCodeSplit: true,
  },
})
