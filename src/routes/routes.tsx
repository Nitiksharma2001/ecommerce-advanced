import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home/main"
import Signin from "../pages/auth/signin"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
])
