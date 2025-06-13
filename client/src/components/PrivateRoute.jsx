import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

/**
 * PrivateRoute Component
 * 
 * Protects routes by verifying user authentication status.
 * Acts as a wrapper around protected routes in the application.
 * 
 * If user is authenticated:
 *   - Renders child routes via Outlet
 * If user is not authenticated:
 *   - Redirects to login page
 */
const PrivateRoute = () => {
  // Extract current user from Redux store
  const { currentUser } = useSelector((state) => state.user)

  // If user exists, render child routes; otherwise redirect to login
  return currentUser ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateRoute