import moment from "moment"
import React from "react"
import { IoMdClose } from "react-icons/io"

/**
 * FilterInfoTitle Component
 * * Displays information about the active filter applied to travel stories.
 * Shows either search results header or date range filter with the ability to clear.
 * * @param {string} filterType - Type of filter being applied ('search' or 'date')
 * @param {object} filterDate - Object containing from and to dates for filtering
 * @param {function} onClear - Handler function to clear the current filter
 */
const FilterInfoTitle = ({ filterType, filterDate, onClear }) => {
  /**
   * DateRangeChip Component
   * * Displays a chip containing the selected date range with a clear button.
   * * @param {object} date - Object with from and to properties representing the date range
   */
  const DateRangeChip = ({ date }) => {
    // Format dates or show N/A if not provided
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A"

    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A"

    return (
      <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-1 text-gray-200">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
          </svg>
          <p className="text-sm font-semibold">
            {startDate} - {endDate}
          </p>
        </div>

        <button
          onClick={onClear}
          className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-rose-400 transition-all duration-300 hover:scale-110"
          title="Clear filter"
        >
          <IoMdClose className="w-4 h-4" />
        </button>
      </div>
    )
  }

  // Only render if a filter type is provided
  return (
    filterType && (
      <div className="mb-6 animate-fadeInDown">
        {/* Search filter display */}
        {filterType === "search" ? (
          <div className="flex items-center gap-2 mb-4">
            {/* Search icon with gradient background */}
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" />
              </svg>
            </div>
            {/* Search results title */}
            <h3 className="text-xl font-bold text-white">Search Results</h3>
          </div>
        ) : (
          /* Date filter display */
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Location pin icon with gradient background */}
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="10" r="3" strokeWidth="2" />
                </svg>
              </div>
              {/* Filter title */}
              <h3 className="text-xl font-bold text-white">
                Travel Stories from
              </h3>
            </div>

            {/* Date range filter chip */}
            <DateRangeChip date={filterDate} />
          </div>
        )}
      </div>
    )
  )
}

export default FilterInfoTitle