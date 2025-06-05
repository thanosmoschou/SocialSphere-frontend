import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { APP_BASE_URL } from './src/lib/constants';


// https://vitejs.dev/config/
export default defineConfig(() => {
  const BASE_URL_FOR_VITE = APP_BASE_URL;

  return {
    plugins: [react(), tailwindcss()],
    base: BASE_URL_FOR_VITE,
  };
});
