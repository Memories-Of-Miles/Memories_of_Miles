import React from "react"
import { IoMdClose } from "react-icons/io"
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          {storyInfo?.title || "Travel Story"}
        </h1>
        
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 border border-emerald-200 rounded-lg transition-all duration-300 font-medium text-sm"
            onClick={onEditClick}
          >
            <MdOutlineUpdate className="text-lg" /> 
            Edit Story
          </button>

          <button 
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 rounded-lg transition-all duration-300 font-medium text-sm"
            onClick={onDeleteClick}
          >
            <MdOutlineDelete className="text-lg" /> 
            Delete
          </button>

          <button 
            className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg transition-all duration-300"
            onClick={onClose}
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="space-y-6">
        {/* Story Meta Info */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <span className="font-medium">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>
          </div>

          {/* Location Tags */}
          {storyInfo?.visitedLocation && storyInfo.visitedLocation.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 text-emerald-600">
                <FaLocationDot className="text-sm" />
                <span className="font-medium text-gray-700 text-sm">Visited:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {storyInfo.visitedLocation.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Story Image */}
        {storyInfo?.imageUrl && (
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={storyInfo.imageUrl}
              alt={storyInfo.title || "Travel story"}
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Story Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-justify">
              {storyInfo?.story || "No story content available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTravelStory
