import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, useEffect } from 'react'

import { pageSuspense } from './utils/suspense'
import { useDispatch } from 'react-redux'
import { setUser } from './features/user/userSlice'
import { getAuthUserDetails } from './utils/api'

const ProtectedRoute = lazy(() => import('./components/global/ProtectedRoute'))
const ProtectedRouteForVendors = lazy(
  () => import('./components/global/ProtectedRouteForVendors')
)
const AccountLayout = lazy(() => import('./components/layouts/AccountLayout'))
const AppLayout = lazy(() => import('./components/layouts/AppLayout'))
const AuthLayout = lazy(() => import('./components/layouts/AuthLayout'))
const CartLayout = lazy(() => import('./components/layouts/CartLayout'))
const MarketplaceLayout = lazy(
  () => import('./components/layouts/MarketplaceLayout')
)
const VendorsLayout = lazy(() => import('./components/layouts/VendorsLayout'))
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

const router = createBrowserRouter([
  {
    path: 'auth',
    element: pageSuspense(<AuthLayout />),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: pageSuspense(<Login />),
      },
      {
        path: 'sign-up',
        element: pageSuspense(<SignUp />),
      },
      {
        path: 'verification/:type',
        element: pageSuspense(<Verification />),
      },
      {
        path: 'complete-registration',
        element: pageSuspense(<CompleteRegistration />),
      },
      {
        path: 'forgot-password',
        element: pageSuspense(<ForgotPassword />),
      },
      {
        path: 'reset-password',
        element: pageSuspense(<ResetPassword />),
      },
    ],
  },
  {
    path: '/',
    element: pageSuspense(<AppLayout />),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: pageSuspense(<Home />),
      },
      {
        path: 'marketplace',

        element: pageSuspense(
          <ProtectedRouteForVendors>
            <MarketplaceLayout />
          </ProtectedRouteForVendors>
        ),
        children: [
          {
            index: true,
            element: pageSuspense(<Marketplace />),
          },

          {
            path: ':productname/:productid',
            element: pageSuspense(<ProductDetails />),
          },
        ],
      },
      {
        path: 'cart',

        element: pageSuspense(
          <ProtectedRouteForVendors>
            <CartLayout />
          </ProtectedRouteForVendors>
        ),
        children: [
          {
            index: true,
            element: pageSuspense(<Cart />),
          },
          {
            path: 'checkout',
            element: pageSuspense(
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'vendors',
        element: pageSuspense(
          <ProtectedRouteForVendors>
            <VendorsLayout />
          </ProtectedRouteForVendors>
        ),
        children: [
          {
            index: true,
            element: pageSuspense(<Vendors />),
          },
          {
            path: ':vendorname/:vendorid',
            element: pageSuspense(<VendorProfile />),
          },
        ],
      },
      {
        path: 'restricted_access',
        element: pageSuspense(<RestrictedAccess />),
      },
    ],
  },
  {
    path: 'account',
    element: pageSuspense(<AccountLayout />),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: pageSuspense(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: pageSuspense(
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: pageSuspense(
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: pageSuspense(<Settings />),
      },
    ],
  },
])

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getAuthUserDetails()

      dispatch(
        setUser({
          userData: userInfo?.userData,
          userRole: userInfo?.userRole,
          user: userInfo?.user,
        })
      )
    }

    getUser()
  }, [dispatch])
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
