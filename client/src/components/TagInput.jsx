import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag()
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-3">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-2 text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-lg">
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className="hover:text-white transition-colors">
                <IoMdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          value={inputValue}
          className="input-field bg-gray-800/50"
          placeholder="Add tags (Location, Vibe, etc.)"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addNewTag}
          className="absolute right-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
        >
          <IoMdAdd />
        </button>
      </div>
    </div>
  )
}

export default TagInput