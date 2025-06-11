import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div className="relative">
      <div className="flex items-center bg-white border-2 border-gray-200 hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter Your Password"}
          className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400"
          type={isShowPassword ? "text" : "password"}
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="ml-3 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          aria-label={isShowPassword ? "Hide password" : "Show password"}
        >
          {isShowPassword ? (
            <FaRegEye
              size={20}
              className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
