import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import RedirectPath from './components/redirectPath/redirectPathProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <RedirectPath>
      <Provider store={store}>
        <Toaster position="top-center" />
        <App />
      </Provider>
    </RedirectPath>
  </HelmetProvider>
)
