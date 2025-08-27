import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import AppContext from './components/redirectPath/redirectPathProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <AppContext>
      <Provider store={store}>
        <Toaster position="top-center" />
        <App />
      </Provider>
    </AppContext>
  </HelmetProvider>
)
