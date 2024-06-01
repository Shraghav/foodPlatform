import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

//the below code is to make sure that data is not lost after we move front and back of the website
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus : false,
    },
  }
})
//main part of frontend
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* all the components have access to auth Auth0Provider */}
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right' richColors />
        </Auth0ProviderWithNavigate>
        {/* keeping code organized */}
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
