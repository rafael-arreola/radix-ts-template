import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [oxlintPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
