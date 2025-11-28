import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signOutSuccess } from "../redux/slice/userSlice"
import axiosInstance from "../utils/axiosInstance"
import SearchBar from "./SearchBar"
import Profile from "./Profile"

const Navbar = ({ searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const onLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await axiosInstance.post("/user/signout")
      localStorage.clear()
      dispatch(signOutSuccess())
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleSearch = () => {
    if (searchQuery?.trim()) onSearchNote(searchQuery.trim())
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3">
      <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Memoirs
          </span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center px-8">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={() => {
              setSearchQuery("")
              handleClearSearch()
            }}
          />
        </div>

        <Profile onLogout={onLogout} isLoggingOut={isLoggingOut} />
      </div>
    </nav>
  )
}

export default Navbar