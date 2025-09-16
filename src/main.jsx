import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './Component/router/routes.jsx'
import AuthProvider from './Component/Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
     <RouterProvider router={routes}> 
   </RouterProvider>
 </AuthProvider>
  </StrictMode>,
)
