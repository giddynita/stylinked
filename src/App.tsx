import { ThemeProvider } from '@/components/theme/theme-provider'
import {
  CompleteRegistration,
  ForgotPassword,
  Home,
  Login,
  Dashboard,
  ResetPassword,
  SignUp,
  Verification,
  Products,
  Marketplace,
  ProductDetails,
  Cart,
  Checkout,
  Orders,
  Vendors,
  RestrictedAccess,
  Error,
  Settings,
} from './pages'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute, ProtectedRouteForVendors } from './components/global'
import VendorProfile from './pages/VendorProfile'
import {
  AccountLayout,
  AppLayout,
  AuthLayout,
  CartLayout,
  MarketplaceLayout,
  VendorsLayout,
} from './components/layouts'

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
    errorElement: <Error />,
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
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'marketplace',

        element: (
          <ProtectedRouteForVendors>
            <MarketplaceLayout />
          </ProtectedRouteForVendors>
        ),
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

        element: (
          <ProtectedRouteForVendors>
            <CartLayout />
          </ProtectedRouteForVendors>
        ),
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
      {
        path: 'vendors',
        element: (
          <ProtectedRouteForVendors>
            <VendorsLayout />
          </ProtectedRouteForVendors>
        ),
        children: [
          {
            index: true,
            element: <Vendors />,
          },
          {
            path: ':vendorname/:vendorid',
            element: <VendorProfile />,
          },
        ],
      },
      { path: 'restricted_access', element: <RestrictedAccess /> },
    ],
  },
  {
    path: 'account',
    element: <AccountLayout />,
    errorElement: <Error />,
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
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: <Settings />,
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
