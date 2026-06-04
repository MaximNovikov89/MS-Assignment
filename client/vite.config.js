import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Fixed the package name here
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['../GameMechanics/constants.js'] // Force Vite to pre-bundle this file as ESM
  },
  resolve: {
    alias: {
      // Clean alias so you don't have to use messy "../../" relative paths
      '@shared': path.resolve(__dirname, '../GameMechanics')
    }
  }
});