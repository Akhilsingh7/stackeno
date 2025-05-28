import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // 	Makes the proxy request look like it's coming from the target server's origin
        secure: false, //	Disables SSL cert validation (for self-signed certs)
      },
    },
  },
})
