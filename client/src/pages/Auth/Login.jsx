import React, { useEffect, useState } from "react"
import PasswordInput from "../../components/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import { useDispatch, useSelector } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showAnimation, setShowAnimation] = useState(false)

  const { loading, currentUser } = useSelector((state) => state.user)

  // Trigger animations after component mounts
  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter your password.")
      return
    }

    setError(null)

    // Login API call
    try {
      dispatch(signInStart())

      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      })

      if (response.data) {
        dispatch(signInSuccess(response.data))
        navigate("/")
      } else {
        dispatch(signInFailure("An unexpected error occurred!"))
      }
    } catch (error) {
      dispatch(signInFailure("An unexpected error occurred!"))
      
      console.error("Authentication error:", error);
      
      // Show more detailed error info if available
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError(`Server error (${error.response.status}): Please try again later.`);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please check your connection.");
      } else {
        console.error("Error message:", error.message);
        setError(`Error: ${error.message}`);
      }
    }
  }

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/")
    }
  }, [currentUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 overflow-hidden relative py-4 sm:py-8 md:py-0">
      {/* Animated mountain silhouettes */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-20"></div>
      <div className="hidden lg:block absolute bottom-20 left-0 right-0 h-60 bg-[url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80')] bg-cover opacity-10 transform scale-110"></div>
      
      {/* Stars animation */}
      <div className="stars-container absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="star absolute w-1 h-1 rounded-full bg-white opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Floating clouds decoration */}
      <div className={`absolute right-10 top-40 w-32 h-10 rounded-full bg-white/5 filter blur-md transition-all duration-3000 ease-in-out ${showAnimation ? 'opacity-60 translate-x-5' : 'opacity-0 translate-x-20'}`} style={{animationDelay: "1s"}}></div>
      <div className={`absolute -left-10 top-20 w-40 h-12 rounded-full bg-white/5 filter blur-md transition-all duration-3000 ease-in-out ${showAnimation ? 'opacity-40 translate-x-10' : 'opacity-0 -translate-x-10'}`} style={{animationDelay: "2s"}}></div>
      <div className={`absolute bottom-40 right-1/4 w-36 h-10 rounded-full bg-white/5 filter blur-md transition-all duration-3000 ease-in-out ${showAnimation ? 'opacity-50 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: "3s"}}></div>
      
      <div className={`container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 transition-all duration-1000 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
        {/* Image and quote section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 transition-all duration-1500 delay-300 ease-out ${showAnimation ? 'translate-x-0' : '-translate-x-36'}`}>
          <div className="p-6 md:p-8 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/70 to-slate-900/70 shadow-2xl backdrop-blur-md border border-slate-600/30">
            <div className="w-full h-[30vh] md:h-[40vh] overflow-hidden rounded-xl shadow-inner mb-6 transform hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Mountain adventure"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <h3 className="text-white text-xl font-bold">Alpine Adventures</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-300">Journey to New Heights</span>
              </h2>
              
              <p className="text-slate-300 text-sm md:text-base">
                Track your mountain expeditions, document breathtaking views, and share your adventures with fellow explorers.
              </p>
              
            
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 relative p-6 sm:p-8 md:p-10 transition-all duration-1500 delay-500 ease-out ${showAnimation ? 'translate-y-0' : 'translate-y-20'}`}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 mb-8">Sign in to continue your adventures</p>

            <div className={`space-y-5 transition-all duration-700 delay-700 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all outline-none placeholder-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="w-full bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              {error && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-3 rounded animate-fadeIn">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: "0ms"}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: "150ms"}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: "300ms"}}></div>
                  </div>
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-medium hover:from-emerald-600 hover:to-sky-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-sky-500/50 focus:outline-none"
                >
                  Sign In
                </button>
              )}

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-600"></div>
                <p className="text-xs text-slate-500 px-3">Or continue with</p>
                <div className="flex-grow border-t border-slate-600"></div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-lg border border-slate-600 bg-slate-800/30 text-slate-300 font-medium hover:bg-slate-700/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                onClick={() => navigate("/sign-up")}
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </span>
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Add the necessary animation keyframes in a style tag */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default Login