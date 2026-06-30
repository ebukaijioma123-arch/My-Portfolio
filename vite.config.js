import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// In Tailwind v4, instead of a separate PostCSS config file,
// Tailwind ships as a Vite plugin directly. This is faster
// and means one less config file to maintain.

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This single line replaces postcss.config.js + tailwind.config.js content scanning
  ],
})