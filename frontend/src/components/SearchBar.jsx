import React from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full group">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <FaSearch className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-focus-within:text-emerald-600 transition-colors duration-300" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search travel stories..."
        className="w-full pl-12 pr-12 py-3 text-sm bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 hover:border-emerald-300 transition-all duration-300 placeholder-gray-400 group-hover:bg-white/90"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* Clear/Search Button */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            className="p-1 mr-2 text-gray-400 hover:text-red-500 transition-colors duration-300 rounded-full hover:bg-red-50"
            title="Clear search"
          >
            <IoMdClose className="w-4 h-4" />
          </button>
        )}
        
        <button
          type="button"
          onClick={handleSearch}
          className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          title="Search"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
