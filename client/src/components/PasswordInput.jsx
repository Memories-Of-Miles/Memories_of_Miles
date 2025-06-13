import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

/**
 * PasswordInput Component
 * 
 * A specialized input field for password entry with show/hide functionality.
 * Provides visual feedback and allows users to toggle password visibility.
 * Styled to match the mountain theme of the application.
 * 
 * @param {string} value - The current password value
 * @param {Function} onChange - Handler function for input changes
 * @param {string} placeholder - Optional custom placeholder text
 */
const PasswordInput = ({ value, onChange, placeholder }) => {
  // State to track password visibility
  const [isShowPassword, setIsShowPassword] = useState(false)

  /**
   * Toggles password visibility between plain text and masked characters
   */
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div className="relative">
      {/* Input container with focus and hover effects */}
      <div className="flex items-center bg-slate-700/50 border-2 border-slate-600 hover:border-sky-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md">
        {/* Password input field */}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter Your Password"}
          className="w-full text-sm text-white bg-transparent outline-none placeholder-slate-400"
          type={isShowPassword ? "text" : "password"}
        />

        {/* Toggle visibility button */}
        <button
          type="button"
          onClick={toggleShowPassword}
          className="ml-3 p-1 rounded-lg hover:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-label={isShowPassword ? "Hide password" : "Show password"}
        >
          {/* Dynamic icon based on password visibility */}
          {isShowPassword ? (
            <FaRegEye
              size={20}
              className="text-sky-400 hover:text-sky-300 transition-colors duration-300"
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 hover:text-slate-300 transition-colors duration-300"
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput