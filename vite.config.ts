import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["localhost", "futuristicui.com", "www.futuristicui.com"],
  },
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "FutureUI",
      fileName: (format) => `future-ui.${format}.js`,
    },
    rollupOptions: {
      // Ensure to externalize dependencies that shouldn't be bundled
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
