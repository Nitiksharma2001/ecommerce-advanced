import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import UserProvider from './hooks/context'
import './index.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
)
