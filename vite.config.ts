import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  
  // Configuration pour éviter les erreurs de fetch dans l'environnement Figma
  build: {
    sourcemap: false, // Désactiver les source maps qui peuvent causer des erreurs de fetch
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    minify: 'esbuild',
    target: 'es2020',
  },
  
  // Optimisation des dépendances
  optimizeDeps: {
    exclude: ['next-themes'], // Exclure next-themes qui peut causer des problèmes
    include: ['react', 'react-dom', 'react-router'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  
  // Configuration serveur pour le développement
  server: {
    strictPort: false,
    hmr: {
      overlay: false, // Désactive l'overlay d'erreur qui peut causer des problèmes
    },
  },
  
  // Désactiver les avertissements de chunk size
  logLevel: 'warn',
})