import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  LoadingIcon,
  ProtectedRoute,
  ProtectedRouteForVendors,
} from './components/global'
import { lazy, Suspense, type JSX } from 'react'
import {
  AccountLayout,
  AppLayout,
  AuthLayout,
  CartLayout,
  MarketplaceLayout,
  VendorsLayout,
} from './components/layouts'
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Verification = lazy(() => import('./pages/Verification'))
const CompleteRegistration = lazy(() => import('./pages/CompleteRegistration'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

const Home = lazy(() => import('./pages/Home'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const Vendors = lazy(() => import('./pages/Vendors'))
const VendorProfile = lazy(() => import('./pages/VendorProfile'))
const RestrictedAccess = lazy(() => import('./pages/RestrictedAccess'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
const Settings = lazy(() => import('./pages/Settings'))
const Error = lazy(() => import('./pages/Error'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const withSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<LoadingIcon />}>{Component}</Suspense>
)

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
        element: withSuspense(<Login />),
      },
      {
        path: 'sign-up',
        element: withSuspense(<SignUp />),
      },
      {
        path: 'verification/:type',
        element: withSuspense(<Verification />),
      },
      {
        path: 'complete-registration',
        element: withSuspense(<CompleteRegistration />),
      },
      {
        path: 'forgot-password',
        element: withSuspense(<ForgotPassword />),
      },
      {
        path: 'reset-password',
        element: withSuspense(<ResetPassword />),
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
        element: withSuspense(<Home />),
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
            element: withSuspense(<Marketplace />),
          },

          {
            path: ':productname/:productid',
            element: withSuspense(<ProductDetails />),
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
            element: withSuspense(<Cart />),
          },
          {
            path: 'checkout',
            element: withSuspense(
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
            element: withSuspense(<Vendors />),
          },
          {
            path: ':vendorname/:vendorid',
            element: withSuspense(<VendorProfile />),
          },
        ],
      },
      {
        path: 'restricted_access',
        element: withSuspense(<RestrictedAccess />),
      },
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
        element: withSuspense(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: withSuspense(
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: withSuspense(
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: withSuspense(<Settings />),
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
