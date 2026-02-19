import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// MarketHub Color Configuration - Simplified
const colors = {
  // Primary Colors - Blue theme for trust and reliability
  primary: '#9ACD32', // Green-600 - Trust, reliability
  'primary-light': '#CCE698', // Green-400 - Hover states
  'primary-dark': '#6E9324', // Green-700 - Active states

  // Secondary Colors - Green theme for success and growth
  secondary: '#0891b2', // Sky Blue-500 - Success, growth
  'secondary-light': '#22d3ee', // Sky Blue -300 - Hover states
  'secondary-dark': '#155e75', // Sky Blue -600 - Active states

  // Border Color
  border: '#e2e8f0', // Slate-200 - Borders


  //Er
  error: '#dc2626', // Red-500 - Error
  'error-light': '#fee2e2', // Red-400 - Hover states
  'error-dark': '#b91c1c', // Red-600 - Active states
}

// Convert colors object to CSS custom properties
const cssVariables = Object.entries(colors)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // This ensures CSS variables are available in all components
          hoistStatic: false,
        },
      },
    }),
    vueDevTools(),
    // Plugin to inject CSS variables globally
    {
      name: 'inject-css-variables',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>
          <style>
            :root {
              ${cssVariables}
            }
          </style>`,
        )
      },
    },
  ],
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
