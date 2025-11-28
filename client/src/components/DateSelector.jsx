import React, { useState, useRef, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { MdOutlineDateRange, MdClose } from "react-icons/md"
import moment from "moment"

const DateSelector = ({ date, onDateChange = () => {}, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDateSelect = (selectedDate) => {
    // Check if onDateChange is a function before calling it
    if (typeof onDateChange === 'function') {
      onDateChange(selectedDate)
      setIsOpen(false)
    }
  }

  const handleClearDate = (e) => {
    e.stopPropagation()
    // Check if onDateChange is a function before calling it
    if (typeof onDateChange === 'function') {
      onDateChange(null)
    }
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="relative">
        <div 
          className={`flex items-center bg-gray-800/50 border border-gray-700 hover:border-indigo-500/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineDateRange className="text-gray-400 mr-3 text-lg group-hover:text-indigo-400 transition-colors" />
          
          <input
            type="text"
            readOnly
            value={date ? moment(date).format("Do MMM YYYY") : ""}
            placeholder="Select visit date"
            className="w-full text-sm text-gray-200 bg-transparent outline-none placeholder-gray-500 cursor-pointer"
          />
          
          {date && (
            <button
              onClick={handleClearDate}
              className="ml-2 p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-rose-400 transition-all duration-300"
              title="Clear date"
            >
              <MdClose className="text-lg" />
            </button>
          )}
        </div>
        
        {/* Date Picker Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-xl shadow-indigo-500/10 z-50 overflow-hidden">
            <div className="p-4">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="!font-sans rdp-custom dark"
                modifiersClassNames={{
                  selected: "!bg-gradient-to-r !from-indigo-500 !to-pink-500 !text-white hover:!from-indigo-600 hover:!to-pink-600 shadow-md",
                  today: "!text-indigo-400 font-bold bg-indigo-500/10 rounded-full"
                }}
                styles={{
                  caption: { color: '#e5e7eb' }, // gray-200
                  caption_label: { color: '#f3f4f6', fontWeight: 'bold' }, // gray-100
                  head_cell: { color: '#9ca3af' }, // gray-400
                  button: { color: '#e5e7eb' }, // gray-200
                  day_outside: { color: '#4b5563' } // gray-600
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DateSelector