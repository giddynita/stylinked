import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute, ProtectedRouteForVendors } from './components/global'
import { lazy, useEffect } from 'react'
import { layoutSuspense, pageSuspense } from './utils/suspense'
import { useDispatch } from 'react-redux'
import { setUserData, setUserRole } from './features/user/userSlice'
import { getAuthUserDetails } from './utils/api'
import { useSelector } from 'react-redux'

//layouts
import AuthLayout from './components/layouts/AuthLayout'
import AppLayout from './components/layouts/AppLayout'
import MarketplaceLayout from './components/layouts/MarketplaceLayout'
import CartLayout from './components/layouts/CartLayout'
import VendorsLayout from './components/layouts/VendorsLayout'
import AccountLayout from './components/layouts/AccountLayout'

//pages
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
const Reviews = lazy(() => import('./pages/Reviews'))
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
    element: layoutSuspense(<AuthLayout />),
    errorElement: pageSuspense(<Error />),
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
    errorElement: pageSuspense(<Error />),
    children: [
      {
        index: true,
        element: pageSuspense(<Home />),
      },
      {
        path: 'marketplace',
        element: layoutSuspense(<MarketplaceLayout />),
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
        element: (
          <ProtectedRouteForVendors>
            {layoutSuspense(<CartLayout />)}
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
        element: layoutSuspense(<VendorsLayout />),
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
    element: layoutSuspense(<AccountLayout />),
    errorElement: pageSuspense(<Error />),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute>{pageSuspense(<Dashboard />)}</ProtectedRoute>,
      },
      {
        path: 'products',
        element: <ProtectedRoute>{pageSuspense(<Products />)}</ProtectedRoute>,
      },
      {
        path: 'orders',
        element: <ProtectedRoute>{pageSuspense(<Orders />)}</ProtectedRoute>,
      },
      {
        path: 'reviews',
        element: <ProtectedRoute>{pageSuspense(<Reviews />)}</ProtectedRoute>,
      },
      {
        path: 'settings',
        element: <ProtectedRoute>{pageSuspense(<Settings />)}</ProtectedRoute>,
      },
    ],
  },
])

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.userState)

  useEffect(() => {
    const getUserDetails = async () => {
      if (user) {
        const { userData, userRole } = await getAuthUserDetails(user)
        dispatch(
          setUserData({
            userData,
          })
        )
        dispatch(
          setUserRole({
            userRole,
          })
        )
      }
    }
    getUserDetails()
  }, [user, dispatch])
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
