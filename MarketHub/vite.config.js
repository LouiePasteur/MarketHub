import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// MarketHub Color Configuration - Simplified
const colors = {
  // Primary Colors - Blue theme for trust and reliability
  primary: '#2563eb', // Blue-600 - Trust, reliability
  'primary-light': '#3b82f6', // Blue-500 - Hover states
  'primary-dark': '#1d4ed8', // Blue-700 - Active states

  // Secondary Colors - Green theme for success and growth
  secondary: '#059669', // Emerald-600 - Success, growth
  'secondary-light': '#10b981', // Emerald-500 - Hover states
  'secondary-dark': '#047857', // Emerald-700 - Active states

  // Border Color
  border: '#e2e8f0', // Slate-200 - Borders
}

// Convert colors object to CSS custom properties
const cssVariables = Object.entries(colors)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          :root {
            ${cssVariables}
          }
        `,
      },
      css: {
        additionalData: `
          :root {
            ${cssVariables}
          }
        `,
      },
    },
  },
  define: {
    __COLORS__: JSON.stringify(colors),
  },
})
