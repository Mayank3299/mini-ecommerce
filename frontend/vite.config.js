/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "src/setupTests.js",
        "src/main.jsx",
        "**/*.test.{js,jsx}",
        "**/*.config.{js,ts}",
      ],
    },
  },
});
