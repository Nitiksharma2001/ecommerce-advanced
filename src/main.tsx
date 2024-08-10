import * as ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import UserProvider from './hooks/context'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
)
