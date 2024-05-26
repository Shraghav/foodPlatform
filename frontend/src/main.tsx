import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'

//main part of frontend
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      {/* all the components have access to auth Auth0Provider */}
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
      {/* keeping code organized */}
    </Router>
  </React.StrictMode>,
)
