import { CompleteRegistration, Login, SignUp, Verification } from './pages'
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
    path: 'verification',
    element: <Verification />,
  },
  {
    path: 'complete-registration',
    element: <CompleteRegistration />,
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
