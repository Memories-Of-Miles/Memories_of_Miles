import React from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="relative w-full max-w-md group">
      <FaSearch className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
      
      <input
        type="text"
        placeholder="Search your memories..."
        className="w-full bg-gray-800/50 border border-gray-700 rounded-full pl-11 pr-12 py-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner placeholder-gray-500"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <div className="absolute right-2 top-2 flex items-center gap-1">
        {value && (
          <button 
            onClick={onClearSearch} 
            className="p-1.5 hover:bg-gray-700 rounded-full text-gray-400 hover:text-rose-400 transition-colors"
          >
            <IoMdClose />
          </button>
        )}
        <button 
            onClick={handleSearch} 
            className="p-1.5 bg-gray-800 hover:bg-indigo-600 rounded-full text-gray-400 hover:text-white transition-all shadow-sm"
        >
          <FaSearch className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar