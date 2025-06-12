import React, { useEffect, useState } from "react"
import PasswordInput from "../../components/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showAnimation, setShowAnimation] = useState(false)

  const { loading, currentUser } = useSelector((state) => state.user)

  // Trigger animations after component mounts
  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter your password.")
      return
    }

    setError(null)

    // SignUp API call
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      })

      // handle successful sign-up response
      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
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
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 bg-[url('/background/mountain-1.jpg')] bg-cover opacity-20"></div>
      <div className="hidden lg:block absolute bottom-20 left-0 right-0 h-60 bg-[url('/background/mountain-2.jpg')] bg-cover opacity-10 transform scale-110"></div>
      
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
      
      <div className={`container mx-auto px-4 sm:px-6 md:px-8 min-h-[calc(100vh-3rem)] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 transition-all duration-1000 py-8 md:py-16 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
        {/* Image and quote section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 transition-all duration-1500 delay-300 ease-out ${showAnimation ? 'translate-x-0' : '-translate-x-36'}`}>
          <div className="p-6 md:p-8 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/70 to-slate-900/70 shadow-2xl backdrop-blur-md border border-slate-600/30">
            <div className="w-full h-[30vh] md:h-[40vh] overflow-hidden rounded-xl shadow-inner mb-6 transform hover:scale-105 transition-all duration-500">
              <img 
                src="/images/mountain-journey.jpg" 
                alt="Mountain journey"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <h3 className="text-white text-xl font-bold">Mountain Expeditions</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-300">Begin Your Adventure</span>
              </h2>
              
              <p className="text-slate-300 text-sm md:text-base">
                Create an account to document your travels, share stunning photos, and connect with fellow adventurers.
              </p>
              
           
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 bg-slate-800/30 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 relative p-6 sm:p-8 md:p-10 transition-all duration-1500 delay-500 ease-out ${showAnimation ? 'translate-y-0' : 'translate-y-20'}`}>
          <form onSubmit={handleSignUp} className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Create Account</h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 mb-8">Start your journey with us today</p>

            <div className={`space-y-5 transition-all duration-700 delay-700 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all outline-none placeholder-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
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
                  Create Account
                </button>
              )}

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-600"></div>
                <p className="text-xs text-slate-500 px-3">Already have an account?</p>
                <div className="flex-grow border-t border-slate-600"></div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-lg border border-slate-600 bg-slate-800/30 text-slate-300 font-medium hover:bg-slate-700/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                onClick={() => navigate("/login")}
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </span>
                Sign In Instead
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

export default SignUp