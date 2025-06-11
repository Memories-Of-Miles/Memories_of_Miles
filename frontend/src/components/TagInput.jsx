import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { FaLocationDot } from "react-icons/fa6"

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-3">
      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-emerald-100 hover:border-emerald-300 group"
            >
              <FaLocationDot className="text-sm text-emerald-600" />
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="p-0.5 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                title={`Remove ${tag}`}
              >
                <IoMdClose className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            className="w-full text-sm text-gray-900 bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-gray-400"
            placeholder="Add location (e.g., Paris, France)"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={addNewTag}
          disabled={!inputValue.trim()}
          title="Add location"
        >
          <IoMdAdd className="text-lg" />
        </button>
      </div>

      {/* Helper Text */}
      {tags.length === 0 && (
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FaLocationDot className="text-emerald-500" />
          Add locations you visited during your travel
        </p>
      )}
    </div>
  )
}

export default TagInput
