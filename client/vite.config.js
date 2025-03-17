import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base : process.env.VITE_BASE_PATH || "/assignment-19-Develop-E-Commerce-Site-with-MERN"
})
