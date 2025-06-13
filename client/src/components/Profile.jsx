import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { getInitials } from "../utils/helper"
import { useNavigate } from "react-router-dom"

/**
 * Profile Component
 * 
 * Displays user information and provides access to profile actions.
 * Features responsive design with different layouts for mobile and desktop.
 * Includes user avatar, username display, and logout functionality.
 * 
 * @param {Function} onLogout - Handler for user logout action
 * @param {boolean} isLoggingOut - Indicates if logout process is in progress
 */
const Profile = ({ onLogout, isLoggingOut }) => {
  // Get current user data from Redux store
  const { currentUser } = useSelector((state) => state.user)
  // State to control mobile dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // Reference to dropdown container for outside click detection
  const dropdownRef = useRef(null)
  // Navigation hook for routing
  const navigate = useNavigate()

  /**
   * Effect to close dropdown when clicking outside
   * Sets up and cleans up event listeners to detect outside clicks
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center gap-3 group">
      {/* Avatar with click to profile */}
      <div className="relative">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-cyan-400 shadow-xl border-4 border-slate-700 ring-2 ring-slate-600 hover:ring-sky-400 transition-all duration-300 cursor-pointer select-none text-white text-xl font-extrabold uppercase"
          onClick={() => navigate("/profile/edit")}
          title="View/Edit Profile"
        >
          {/* Show profile picture if available, otherwise show initials */}
          {currentUser?.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            getInitials(currentUser?.username)
          )}
        </div>
        {/* Online status indicator */}
        <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-700 rounded-full shadow-md animate-pulse"></span>
      </div>

      {/* User Info - Desktop Only */}
      <div className="hidden sm:flex flex-col">
        <span className="text-base font-bold text-white tracking-wide flex items-center gap-1">
          {currentUser?.username || "User"}
        </span>
        <button
          className="mt-1 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold shadow hover:from-red-500 hover:to-rose-400 transition-all duration-300 disabled:opacity-60"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-300"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="User menu"
        >
          <svg
            className="w-5 h-5 text-sky-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1.5" strokeWidth="2" />
            <circle cx="19" cy="12" r="1.5" strokeWidth="2" />
            <circle cx="5" cy="12" r="1.5" strokeWidth="2" />
          </svg>
        </button>
        {/* Dropdown content - only shown when open */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-xl shadow-xl border border-slate-700 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-slate-700">
              <div className="font-bold text-white">{currentUser?.username || "User"}</div>
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 rounded-b-xl transition-colors duration-200 font-semibold"
              onClick={onLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile