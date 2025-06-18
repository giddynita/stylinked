import { ThemeProvider } from '@/components/theme/theme-provider'
import {
  AuthLayout,
  CompleteRegistration,
  DashboardLayout,
  ForgotPassword,
  Home,
  Layout,
  Login,
  Dashboard,
  ResetPassword,
  SignUp,
  Verification,
  Products,
} from './pages'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
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
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: 'account',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'orders',
        element: <Verification />,
      },
      {
        path: 'settings',
        element: <CompleteRegistration />,
      },
    ],
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
