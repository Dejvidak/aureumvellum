import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        feny: resolve(__dirname, "feny.html"),
        kryciPsi: resolve(__dirname, "kryci-psi.html"),
        odchovy: resolve(__dirname, "odchovy.html"),
        amelie: resolve(__dirname, "amelie-aureum.html"),
        bruno: resolve(__dirname, "bruno-golden-vale.html")
      }
    }
  }
});
