import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/main'
import Signin from '../pages/auth/signin'
import Music from '../pages/music/main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/music',
    element: <Music />,
  },
])
