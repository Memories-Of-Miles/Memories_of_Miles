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
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          {storyInfo?.title || "Travel Story"}
        </h1>
        
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 rounded-xl transition-all duration-300 font-medium text-sm hover:scale-105 active:scale-95"
            onClick={onEditClick}
          >
            <MdOutlineUpdate className="text-lg" /> 
            Edit
          </button>

          <button 
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-xl transition-all duration-300 font-medium text-sm hover:scale-105 active:scale-95"
            onClick={onDeleteClick}
          >
            <MdOutlineDelete className="text-lg" /> 
            Delete
          </button>

          <button 
            className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full transition-all duration-300 ml-2"
            onClick={onClose}
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="space-y-6">
        {/* Story Meta Info */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
          <div className="flex items-center gap-2 text-gray-300">
            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <span className="font-medium text-sm sm:text-base">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>
          </div>

          {/* Location Tags */}
          {storyInfo?.visitedLocation && storyInfo.visitedLocation.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-indigo-400">
                <FaLocationDot className="text-sm" />
                <span className="font-medium text-gray-400 text-sm">Visited:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {storyInfo.visitedLocation.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-700/50 text-indigo-200 text-xs font-medium rounded-lg border border-indigo-500/20"
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
          <div className="relative overflow-hidden rounded-2xl shadow-xl group border border-gray-700/50">
            <img
              src={storyInfo.imageUrl}
              alt={storyInfo.title || "Travel story"}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        {/* Story Content Text */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-justify text-base sm:text-lg font-light tracking-wide">
              {storyInfo?.story || "No story content available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTravelStory