import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import AppContext from './utils/globalContext.tsx'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './utils/supabaseClient.ts'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <SessionContextProvider supabaseClient={supabase}>
      <AppContext>
        <Provider store={store}>
          <Toaster position="top-center" />
          <App />
        </Provider>
      </AppContext>
    </SessionContextProvider>
  </HelmetProvider>
)
