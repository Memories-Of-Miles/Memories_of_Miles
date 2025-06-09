import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { getInitials } from "../utils/helper"
import { useNavigate } from "react-router-dom"

const Profile = ({ onLogout, isLoggingOut }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown on outside click
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
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 shadow-xl border-4 border-white ring-2 ring-emerald-200 hover:ring-teal-400 transition-all duration-300 cursor-pointer select-none text-white text-xl font-extrabold uppercase"
          onClick={() => navigate("/profile/edit")}
          title="View/Edit Profile"
        >
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
        {/* Online dot */}
        <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-md animate-pulse"></span>
      </div>

      {/* User Info */}
      <div className="hidden sm:flex flex-col">
        <span className="text-base font-bold text-gray-900 tracking-wide flex items-center gap-1">
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

      {/* Mobile Dropdown */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition-colors duration-300"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="User menu"
        >
          <svg
            className="w-5 h-5 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1.5" strokeWidth="2" />
            <circle cx="19" cy="12" r="1.5" strokeWidth="2" />
            <circle cx="5" cy="12" r="1.5" strokeWidth="2" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="font-bold text-gray-800">{currentUser?.username || "User"}</div>
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-b-xl transition-colors duration-200 font-semibold"
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
