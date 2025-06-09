import moment from "moment"
import React from "react"
import { IoMdClose } from "react-icons/io"

const FilterInfoTitle = ({ filterType, filterDate, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A"

    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A"

    return (
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-1 text-emerald-700">
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
          className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
          title="Clear filter"
        >
          <IoMdClose className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    filterType && (
      <div className="mb-6 animate-fadeInDown">
        {filterType === "search" ? (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
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
            <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
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
              <h3 className="text-xl font-bold text-gray-800">
                Travel Stories from
              </h3>
            </div>

            <DateRangeChip date={filterDate} />
          </div>
        )}
      </div>
    )
  )
}

export default FilterInfoTitle
