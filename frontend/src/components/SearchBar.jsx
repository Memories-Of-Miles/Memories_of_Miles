import React from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

/**
 * SearchBar Component
 * 
 * A search input field with integrated clear and submit buttons.
 * Styled to match the mountain theme with slate background and sky/emerald accents.
 * 
 * @param {string} value - Current search text value
 * @param {Function} onChange - Handler for input changes
 * @param {Function} handleSearch - Handler for search submission
 * @param {Function} onClearSearch - Handler to clear search text
 * @param {string} className - Optional additional CSS classes
 */
const SearchBar = ({ value, onChange, handleSearch, onClearSearch, className = "" }) => {
  /**
   * Handle keyboard events for search submission
   * Triggers search when Enter key is pressed
   */
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full group">
      {/* Search Icon - Left side */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <FaSearch className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-focus-within:text-sky-400 transition-colors duration-300" />
      </div>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search travel stories..."
        className={`w-full pl-12 pr-12 py-3 text-sm bg-slate-700/50 backdrop-blur-sm border-2 border-slate-600 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 hover:border-sky-400 transition-all duration-300 placeholder-slate-400 text-white group-hover:bg-slate-700/70 ${className}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* Action Buttons - Right side */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {/* Clear button - Only visible when there is text */}
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            className="p-1 mr-2 text-slate-400 hover:text-red-400 transition-colors duration-300 rounded-full hover:bg-slate-600"
            title="Clear search"
          >
            <IoMdClose className="w-4 h-4" />
          </button>
        )}
        
        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="p-1.5 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          title="Search"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar