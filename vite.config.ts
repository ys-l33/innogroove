import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project from /innogroove/, so production builds
// need that subpath baked into asset URLs. Dev server keeps serving from root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/innogroove/' : '/',
  plugins: [react(), tailwindcss()],
}))
