import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

/* function viteCritters() {
  return {
    name: 'vite-plugin-critters-custom',
    apply: 'build' as const,
    closeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html')
      let html = fs.readFileSync(indexPath, 'utf-8')
      const critters = new Critters({
        preload: 'swap',
        inlineFonts: true,
        pruneSource: true,
      } as Options)
      critters.process(html).then((output: any) => {
        fs.writeFileSync(indexPath, output)
      })
    },
  }
} */

export default defineConfig({
  plugins: [react(), tailwindcss() /* viteCritters() */],
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
          react: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-lazyload',
            'react-helmet-async',
          ],
          reactQuery: ['@tanstack/react-query'],

          // State & Form
          state: ['@reduxjs/toolkit', 'react-redux'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Supabase
          supabase: ['@supabase/supabase-js'],

          // Radix UI (grouped together)
          slot: [
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-separator',
            '@radix-ui/react-avatar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-dropdown-menu',
          ],
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
          payment: ['react-paystack'],
          sitemap: ['sitemap'],
        },
      },
    },
    target: 'es2020',
    cssCodeSplit: true,
  },
})
