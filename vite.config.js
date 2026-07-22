import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base means the built asset paths work whether this ends up
  // at the root of a domain (user/org pages) or under a subpath
  // (project pages, e.g. username.github.io/repo-name/) — no repo name
  // needs to be hardcoded here.
  base: "./",
  plugins: [react()],
});
