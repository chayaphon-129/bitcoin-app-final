import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port:3006
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx$/, // กำหนดให้รองรับ JSX ในไฟล์ .js ที่อยู่ในโฟลเดอร์ src
  },
});
