import {
  CompleteRegistration,
  ForgotPassword,
  Login,
  ResetPassword,
  SignUp,
  Verification,
} from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
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
])

function App() {
  return (
    <div>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </div>
  )
}

export default App
