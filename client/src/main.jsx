/**
 * main.jsx - Application Entry Point
 * 
 * This is the root file that bootstraps the entire VacayStay application.
 * It sets up the necessary providers and context for the app:
 * - ClerkProvider: Handles user authentication
 * - BrowserRouter: Enables client-side routing
 * - AppProvider: Global application context for state management
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

/**
 * Import the Clerk Publishable Key from environment variables
 * This key is used for authentication functionality
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

/**
 * Validation: Ensure the Clerk Publishable Key is configured
 * The app cannot function without proper authentication setup
 */
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

/**
 * Mount the React application to the root DOM element
 * Wrap with three providers:
 * 1. ClerkProvider - Authentication
 * 2. BrowserRouter - Client-side routing
 * 3. AppProvider - Global state management
 */
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </ClerkProvider>
)