import React from "react"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa"

/**
 * TravelStoryCard Component
 * 
 * Displays a travel story in a card format with image, title, description, date, and locations.
 * Features interactive elements including favorite button and hover effects.
 * Styled to match the mountain theme with dark slate backgrounds and emerald-sky accents.
 * 
 * @param {string} imageUrl - URL of the travel image
 * @param {string} title - Title of the travel story
 * @param {string} story - Text content of the story
 * @param {Date} date - Date when the travel occurred
 * @param {Array<string>} visitedLocation - Array of locations visited during the trip
 * @param {boolean} isFavourite - Whether the story is marked as favorite
 * @param {Function} onEdit - Handler for edit action
 * @param {Function} onClick - Handler for card click
 * @param {Function} onFavouriteClick - Handler for favorite button click
 */
const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick,
}) => {
  return (
    <div className="group relative bg-slate-800/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          onClick={onClick}
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-800/70 backdrop-blur-sm rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110 border border-slate-700"
          onClick={onFavouriteClick}
        >
          <FaHeart
            className={`text-lg transition-colors duration-300 ${
              isFavourite
                ? "text-red-500 hover:text-red-400"
                : "text-slate-400 hover:text-red-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5" onClick={onClick}>
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-slate-300">
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
            <span className="font-medium">
              {date ? moment(date).format("Do MMM YYYY") : "Date not available"}
            </span>
          </div>
        </div>

        {/* Story Preview */}
        <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed">
          {story?.slice(0, 100)}
          {story?.length > 100 ? "..." : ""}
        </p>

        {/* Location Tags */}
        {visitedLocation && visitedLocation.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-emerald-400">
              <FaLocationDot className="text-sm" />
              <span className="font-medium text-slate-200">Visited:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {visitedLocation.slice(0, 2).map((location, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-slate-700/60 text-sky-300 text-xs font-medium rounded-lg border border-slate-600"
                >
                  {location}
                </span>
              ))}
              {visitedLocation.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 bg-slate-700/40 text-slate-300 text-xs font-medium rounded-lg">
                  +{visitedLocation.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient for visual appeal */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default TravelStoryCard