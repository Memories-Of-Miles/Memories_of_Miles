import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-gray-950 pt-10 pb-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center gap-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
          <Link to="/terms-of-service" className="hover:text-indigo-400 transition-colors">Terms</Link>
        </div>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Memoirs of Miles. Crafted for travelers.
        </p>
      </div>
    </footer>
  )
}

export default Footer