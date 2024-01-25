import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import { queryClient } from '@/lib/react-query.ts'
import { App } from './App.tsx'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
