import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import AppContext from './utils/globalContext.tsx'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './utils/supabaseClient.ts'

createRoot(document.getElementById('root')!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <AppContext>
      <Toaster position="top-center" />
      <App />
    </AppContext>
  </SessionContextProvider>
)
