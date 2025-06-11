import React, { useState, useRef, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { MdOutlineDateRange, MdClose } from "react-icons/md"
import moment from "moment"

const DateSelector = ({ date, onDateChange = () => {} }) => {
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Visit Date
      </label>
      
      <div className="relative">
        <div 
          className="flex items-center bg-white border-2 border-gray-200 hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineDateRange className="text-gray-400 mr-3 text-lg" />
          
          <input
            type="text"
            readOnly
            value={date ? moment(date).format("Do MMM YYYY") : ""}
            placeholder="Select visit date"
            className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400 cursor-pointer"
          />
          
          {date && (
            <button
              onClick={handleClearDate}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-all duration-300"
              title="Clear date"
            >
              <MdClose className="text-lg" />
            </button>
          )}
        </div>
        
        {/* Date Picker Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
            <div className="p-4">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="!font-sans"
                modifiersClassNames={{
                  selected: "!bg-emerald-500 !text-white hover:!bg-emerald-600",
                  today: "!bg-amber-100 !text-amber-800 font-bold"
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
