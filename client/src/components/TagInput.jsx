import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { FaLocationDot } from "react-icons/fa6"

/**
 * TagInput Component
 * 
 * A component for adding and displaying location tags.
 * Allows users to input multiple locations for their travel stories.
 * Styled to match the mountain theme with slate backgrounds and emerald-sky accents.
 * 
 * @param {Array<string>} tags - Array of current location tags
 * @param {Function} setTags - Function to update the tags array
 */
const TagInput = ({ tags, setTags }) => {
  // State to track the current input value
  const [inputValue, setInputValue] = useState("")

  /**
   * Adds a new tag if the input has valid content
   */
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  /**
   * Updates the input value as user types
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  /**
   * Handles keyboard events to add tags on Enter
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag()
    }
  }

  /**
   * Removes a tag from the collection
   */
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-3">
      {/* Tags Display - Only shown when tags exist */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-slate-700/60 border border-slate-600 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-slate-600/80 hover:border-sky-400 group"
            >
              <FaLocationDot className="text-sm text-emerald-400" />
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="p-0.5 rounded-full hover:bg-slate-600 text-slate-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
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
            className="w-full text-sm text-white bg-slate-700/50 border-2 border-slate-600 hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-slate-400"
            placeholder="Add location (e.g., Paris, France)"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={addNewTag}
          disabled={!inputValue.trim()}
          title="Add location"
        >
          <IoMdAdd className="text-lg" />
        </button>
      </div>

      {/* Helper Text - Only shown when no tags exist */}
      {tags.length === 0 && (
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <FaLocationDot className="text-emerald-400" />
          Add locations you visited during your travel
        </p>
      )}
    </div>
  )
}

export default TagInput