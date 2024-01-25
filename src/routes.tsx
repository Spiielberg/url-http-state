import { Products } from '@/pages/products'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />,
  },
])
