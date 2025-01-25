import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Checkout' // default로 export한 경우, 중괄호 없음
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
