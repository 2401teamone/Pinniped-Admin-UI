import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ...(process.env.NODE_ENV === "production" && {
    base: "/_/",
  }),
});
