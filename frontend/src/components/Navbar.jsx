import React, { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import axiosInstance from "../utils/axiosInstance"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useDispatch } from "react-redux"
import SearchBar from "./SearchBar"

/**
 * Navbar Component
 * 
 * Main navigation bar for the Memoirs of Miles application.
 * Provides search functionality, navigation links, and user profile access.
 * Adapts responsively for mobile and desktop views.
 * 
 * @param {string} searchQuery - Current search string value
 * @param {Function} setSearchQuery - Function to update search query state
 * @param {Function} onSearchNote - Handler function when search is executed
 * @param {Function} handleClearSearch - Handler function to clear search results
 */
const Navbar = ({
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  // Redux state management
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // State to track logout process and prevent double-submissions
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  /**
   * Handles user logout process
   * - Prevents multiple logout attempts
   * - Calls the backend logout endpoint
   * - Updates Redux state on success
   * - Redirects to login page
   */
  const onLogout = useCallback(async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      const response = await axiosInstance.post("/user/signout")

      if (response.data) {
        dispatch(signOutSuccess())
        navigate("/login")
      }
    } catch (error) {
      console.error("Logout failed:", error)
      // You might want to show a toast notification here
    } finally {
      setIsLoggingOut(false)
    }
  }, [dispatch, navigate, isLoggingOut])

  /**
   * Executes search when user submits search input
   * Only searches if query contains non-whitespace characters
   */
  const handleSearch = useCallback(() => {
    if (searchQuery?.trim()) {
      onSearchNote(searchQuery.trim())
    }
  }, [searchQuery, onSearchNote])

  /**
   * Clears both search results and the search input field
   */
  const onClearSearch = useCallback(() => {
    handleClearSearch()
    setSearchQuery("")
  }, [handleClearSearch, setSearchQuery])

  /**
   * Updates search query as user types in search input
   */
  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  return (
    <nav
      className="bg-slate-800/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4 shadow-lg border-b border-slate-700/50 sticky top-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo - App branding and home link */}
      <Link to="/" className="flex-shrink-0" aria-label="Memoirs of Miles - Home">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl flex items-center space-x-1 hover:scale-105 transition-transform duration-300">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-400 drop-shadow-sm">Memoirs</span>
          <span className="text-white drop-shadow-sm">of</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-400 drop-shadow-sm">Miles</span>
          <div
            className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-1"
            aria-hidden="true"
          ></div>
        </h1>
      </Link>

      {/* Desktop Search - Visible only on medium screens and above */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8">
        <div className="w-full relative group">
          {/* Decorative glow effect on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          ></div>
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              aria-label="Search travel stories"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Profile - User account menu and logout functionality */}
      <div className="flex-shrink-0">
        <Profile onLogout={onLogout} isLoggingOut={isLoggingOut} />
      </div>

      {/* Mobile Search - Full-width search bar that appears below the navbar on small screens */}
      <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 shadow-lg">
        <div className="relative group">
          {/* Decorative glow effect on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          ></div>
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              aria-label="Search travel stories"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-sky-500"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar