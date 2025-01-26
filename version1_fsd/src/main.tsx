import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/checkout/ui/Checkout' // default로 export한 경우, 중괄호 없음
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SuccessPage } from './pages/checkout/ui/Success'
import { FailPage } from './pages/checkout/ui/Fail'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success", // 결제 성공 경로
    element: <SuccessPage />,
  },
  {
    path: "/fail", // 결제 실패 경로
    element: <FailPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
