import React, { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import axiosInstance from "../utils/axiosInstance"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useDispatch } from "react-redux"
import SearchBar from "./SearchBar"

const Navbar = ({
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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

  const handleSearch = useCallback(() => {
    if (searchQuery?.trim()) {
      onSearchNote(searchQuery.trim())
    }
  }, [searchQuery, onSearchNote])

  const onClearSearch = useCallback(() => {
    handleClearSearch()
    setSearchQuery("")
  }, [handleClearSearch, setSearchQuery])

  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  return (
    <nav
      className="bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4 shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link to="/" className="flex-shrink-0" aria-label="Travel Diary - Home">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl flex items-center space-x-1 hover:scale-105 transition-transform duration-300">
          <span className="text-emerald-500 drop-shadow-sm">Travel</span>
          <span className="text-teal-700 drop-shadow-sm">Diary</span>
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-pulse ml-1"
            aria-hidden="true"
          ></div>
        </h1>
      </Link>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8">
        <div className="w-full relative group">
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          ></div>
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              aria-label="Search travel stories"
            />
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="flex-shrink-0">
        <Profile onLogout={onLogout} isLoggingOut={isLoggingOut} />
      </div>

      {/* Mobile Search - positioned outside main nav for better accessibility */}
      <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-emerald-100 px-4 py-3 shadow-lg">
        <div className="relative group">
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          ></div>
          <div className="relative">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              aria-label="Search travel stories"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
