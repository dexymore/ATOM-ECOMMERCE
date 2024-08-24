import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { terser } from 'rollup-plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      },
      format: {
        comments: false, // Remove comments
      },
    },
    rollupOptions: {
      plugins: [
        terser({
          format: {
            comments: false, // Remove comments
          },
        }),
      ],
    },
  },
});
