import React from "react"
import moment from "moment"
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa"

const TravelStoryCard = ({ imageUrl, title, story, date, visitedLocation, isFavourite, onFavouriteClick, onClick, onEdit }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 cursor-pointer">
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden" onClick={onClick}>
        <img
          src={imageUrl || "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        
        {/* Floating Date Badge */}
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-gray-200">
          {date ? moment(date).format("MMM Do, YYYY") : "No Date"}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onFavouriteClick(); }}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"
        >
          <FaHeart className={`text-sm ${isFavourite ? "text-rose-500" : "text-white/70"}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-3">
          <h6 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{title}</h6>
          
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
             <FaMapMarkerAlt className="text-indigo-500" />
             <span className="truncate">{visitedLocation.join(", ")}</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {story}
        </p>

        {/* Action Footer (Visible on Hover/Always visible on mobile) */}
        <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Read More</span>
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="text-xs bg-gray-800 hover:bg-indigo-500 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
                Edit Story
            </button>
        </div>
      </div>
    </div>
  )
}

export default TravelStoryCard