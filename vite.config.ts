import path from "path";
import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: lazyPlugins(() => [react(), tailwindcss()]),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  lint: {
    ignorePatterns: ["dist/**"],

    plugins: ["eslint", "typescript", "unicorn", "oxc", "react"],

    env: {
      browser: true,
    },

    rules: {
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "warn",
      "react/only-export-components": ["warn", { allowConstantExport: true }],
    },

    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
