import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { APP_BASE_URL } from './lib/constants.ts';

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter basename={APP_BASE_URL}>
            <App />
         </BrowserRouter>
      </QueryClientProvider>
   </StrictMode>
);
