import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore certain warnings
        if (warning.code === 'MISSING_EXPORT') return;
        warn(warning);
      }
    }
  },
  optimizeDeps: {
    include: ['lucide-react']
  },
  base: '/attendance-clock/'
});
