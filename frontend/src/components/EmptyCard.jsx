import React from "react"

const EmptyCard = ({ imgSrc, message, setOpenAddEditModal }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mx-auto p-8 bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 max-w-md transition-all duration-300 hover:shadow-3xl">
      <div className="bg-gradient-to-br from-slate-700/70 to-slate-900/70 p-6 rounded-full shadow-lg mb-6 transition-transform duration-300 hover:scale-110 border border-slate-600/30">
        <img 
          src={imgSrc} 
          alt="Empty state illustration" 
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-80 filter invert" 
        />
      </div>

      <p className="text-lg font-semibold text-white text-center mb-6 leading-relaxed px-4">
        {message}
      </p>

      <button
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
          <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
        </svg>
        <span>Create New Story</span>
      </button>
    </div>
  )
}

export default EmptyCard