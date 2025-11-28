import React from "react"
import { IoMdAdd } from "react-icons/io"

const EmptyCard = ({ message, setOpenAddEditModal }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mx-auto p-10 glass-card rounded-3xl max-w-lg text-center animate-fade-in-scale">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">No Stories Yet</h3>
      
      <p className="text-gray-400 mb-8 leading-relaxed">
        {message || "Your travel diary is empty. Start documenting your adventures and memories today!"}
      </p>

      <button
        onClick={setOpenAddEditModal}
        className="btn-primary flex items-center gap-2 px-8"
      >
        <IoMdAdd className="text-lg" />
        <span>Create New Story</span>
      </button>
    </div>
  )
}

export default EmptyCard