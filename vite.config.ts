import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    global: "window",
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@mui/icons-material")) {
              return "vendor_mui_icons";
            } else if (id.includes("@mui/x-data-grid")) {
              return "vendor_mui_datagrid";
            } else if (id.includes("@mui/x-date-pickers")) {
              return "vendor_mui_datepickers";
            } else if (id.includes("@mui")) {
              return "vendor_mui";
            }

            return "vendor";
          }
        },
      },
    },
  },
});
