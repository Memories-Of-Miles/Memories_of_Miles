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
          className={`flex items-center bg-slate-700/50 border-2 border-slate-600 hover:border-sky-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineDateRange className="text-slate-400 mr-3 text-lg" />
          
          <input
            type="text"
            readOnly
            value={date ? moment(date).format("Do MMM YYYY") : ""}
            placeholder="Select visit date"
            className="w-full text-sm text-white bg-transparent outline-none placeholder-slate-400 cursor-pointer"
          />
          
          {date && (
            <button
              onClick={handleClearDate}
              className="ml-2 p-1 rounded-full hover:bg-slate-600 text-slate-400 hover:text-red-400 transition-all duration-300"
              title="Clear date"
            >
              <MdClose className="text-lg" />
            </button>
          )}
        </div>
        
        {/* Date Picker Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
            <div className="p-4">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="!font-sans rdp-custom dark"
                modifiersClassNames={{
                  selected: "!bg-gradient-to-r !from-emerald-500 !to-sky-500 !text-white hover:!from-emerald-600 hover:!to-sky-600",
                  today: "!bg-slate-600 !text-emerald-300 font-bold"
                }}
                styles={{
                  caption: { color: 'white' },
                  caption_label: { color: 'white', fontWeight: 'bold' },
                  head_cell: { color: '#94a3b8' },
                  button: { color: 'white' },
                  day_outside: { color: '#64748b' }
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
