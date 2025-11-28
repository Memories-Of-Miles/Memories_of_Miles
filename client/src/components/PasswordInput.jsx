import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const PasswordInput = ({ value, onChange, placeholder, id }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className="relative group">
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="input-field pr-12"
      />
      <button
        type="button"
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="absolute right-4 top-3.5 text-gray-500 hover:text-indigo-400 transition-colors cursor-pointer"
      >
        {isShowPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
      </button>
    </div>
  )
}

export default PasswordInput