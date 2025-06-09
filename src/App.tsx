import { ThemeProvider } from '@/components/theme/theme-provider'
import {
  AuthLayout,
  CompleteRegistration,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  SignUp,
  Verification,
} from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'verification/:type',
        element: <Verification />,
      },
      {
        path: 'complete-registration',
        element: <CompleteRegistration />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
  },
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ThemeProvider>
  )
}

export default App
