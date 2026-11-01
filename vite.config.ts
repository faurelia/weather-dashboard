import path from "path";
import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  fmt: {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
  },
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
