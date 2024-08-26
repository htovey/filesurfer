import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    nodePolyfills({
      include: ['fs'],
    }), 
    react() 
  ],
  define: {
    global: {},
  },
  server: {
    //host: '192.168.1.102',
    port: 3002,
    watch: {
      usePolling: true
    },
  }
})
