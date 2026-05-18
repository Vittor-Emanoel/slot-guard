import path from "node:path";
import { defineConfig } from "vitest/config";

const alias = { "@": path.resolve(__dirname, "./src") };

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: "unit",
          include: ["src/**/*.spec.ts"],
          environment: "node",
        },
      },
      {
        resolve: { alias },
        test: {
          name: "e2e",
          include: ["src/**/*.e2e.ts"],
          environment: "node",
        },
      },
    ],
  },
});
