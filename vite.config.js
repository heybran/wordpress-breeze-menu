import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminDir = path.resolve(__dirname, 'admin');
const publicDir = path.resolve(__dirname, 'public');
const buildDir = path.resolve(__dirname, 'build');

export default defineConfig({
  build: {
    // outDir: path.resolve(adminDir, 'build'),
    // emptyOutDir: true,
    // minify: true,
    // target: 'esnext',
    rollupOptions: {
      input: {
        'breeze-menu-admin': path.resolve(adminDir, 'js/breeze-menu-admin.js'),
        'breeze-menu-public': path.resolve(publicDir, 'js/breeze-menu-public.js'),
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        dir: buildDir,
      },
      // plugins: [,
      //   terser()
      // ],
    }
  },
})