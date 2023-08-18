import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminDir = path.resolve(__dirname, 'admin');

export default defineConfig({
  build: {
    // outDir: path.resolve(adminDir, 'build'),
    // emptyOutDir: true,
    // minify: true,
    // target: 'esnext',
    rollupOptions: {
      input: path.resolve(adminDir, 'src/js/breeze-menu-admin.js'),
      output: {
        dir: path.resolve(adminDir, 'build/'),
        entryFileNames: "[name].js",
        format: 'es',
      },
      // plugins: [,
      //   terser()
      // ],
    }
  },
})