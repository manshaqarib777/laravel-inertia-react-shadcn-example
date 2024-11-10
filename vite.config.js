import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        sourcemap: true,  // Enable sourcemaps for better debugging
        rollupOptions: {
            output: {
              manualChunks: {
                // Customize chunk splitting, e.g., creating a vendor chunk for dependencies
                vendor: ['react', 'react-dom'],
              },
            },
        },
    },
});
