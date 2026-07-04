import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project from /260704/, so production builds need
// that subpath baked into asset URLs. Dev server keeps serving from root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/260704/' : '/',
  plugins: [react(), tailwindcss()],
}))
