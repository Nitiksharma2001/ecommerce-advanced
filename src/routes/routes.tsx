import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home/main"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])
