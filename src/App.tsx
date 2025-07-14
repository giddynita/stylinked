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
  Marketplace,
  ProductDetails,
  MarketplaceLayout,
  Cart,
  Checkout,
  CartLayout,
} from './pages'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute } from './components/global'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
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
      {
        path: 'marketplace',
        element: <MarketplaceLayout />,
        children: [
          {
            index: true,
            element: <Marketplace />,
          },

          {
            path: ':productname/:productid',
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CartLayout />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
          {
            path: 'checkout',
            element: (
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            ),
          },
        ],
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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
