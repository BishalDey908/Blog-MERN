import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    //env variable
    "process.env.VITE_BACKEND_API": JSON.stringify(process.env.VITE_BACKEND_API)
  }
})
