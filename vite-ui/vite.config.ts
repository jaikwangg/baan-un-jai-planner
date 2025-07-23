import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/baan-un-jai-planner/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}))
