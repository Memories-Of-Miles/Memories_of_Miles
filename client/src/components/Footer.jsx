import React from "react"
import { Link } from "react-router-dom"

/**
 * Footer Component
 * 
 * Provides consistent footer across all pages of the application.
 * Includes links and copyright information.
 * Styled to match the mountain theme with dark slate background.
 */
const Footer = () => {
  return (
    <footer className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700/50 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-1 mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-400 font-bold text-lg">Memoirs</span>
              <span className="text-white">of</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-400 font-bold text-lg">Miles</span>
            </Link>
            <p className="text-slate-400 text-sm">Document your adventures around the world</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/" className="text-slate-300 hover:text-sky-400 transition-colors">Home</Link>
            <Link to="/profile/edit" className="text-slate-300 hover:text-sky-400 transition-colors">Profile</Link>
            <Link to="/privacy-policy" className="text-slate-300 hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-slate-300 hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-700/50 mt-6 pt-6 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Memoirs of Miles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer