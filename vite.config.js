import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dotenv from 'dotenv'


// https://vitejs.dev/config/
export default defineConfig(({ _, mode }) => {
  dotenv.config({path: '.okta.env'})

  const env = loadEnv(mode, process.cwd(), '')

  if (!env.ISSUER || !env.CLIENT_ID) {
    throw new Error(`Set ISSUER and CLIENT_ID in .okta.env`)
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom')
      }
    },
    define: {
      'ISSUER': JSON.stringify(env.ISSUER),
      'CLIENT_ID': JSON.stringify(env.CLIENT_ID)
    }  
  }

})
