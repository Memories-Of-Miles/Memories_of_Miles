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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 overflow-hidden relative py-4 sm:py-8 md:py-0">
      {/* Animated background elements */}
      <div className="hidden lg:block absolute top-20 left-20 w-32 h-32 bg-cyan-300/20 rounded-full filter blur-xl animate-pulse"></div>
      <div className="hidden lg:block absolute bottom-20 right-20 w-40 h-40 bg-blue-300/20 rounded-full filter blur-xl animate-pulse" style={{animationDelay: "2s"}}></div>
      
      {/* Floating circles decoration */}
      <div className={`absolute right-10 -top-10 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300/50 transition-all duration-1000 ease-out ${showAnimation ? 'opacity-60' : 'opacity-0 translate-y-10'}`}></div>
      <div className={`absolute left-10 top-40 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400/50 transition-all duration-1000 delay-300 ease-out ${showAnimation ? 'opacity-40' : 'opacity-0 -translate-x-10'}`}></div>
      <div className={`absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300/50 transition-all duration-1000 delay-500 ease-out ${showAnimation ? 'opacity-50' : 'opacity-0 translate-y-10'}`}></div>
      
      <div className={`container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 transition-all duration-1000 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
        {/* Image and quote section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 transition-all duration-1000 delay-300 ease-out ${showAnimation ? 'translate-x-0' : '-translate-x-20'}`}>
          <div className="p-6 md:p-8 rounded-t-2xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl">
            <div className="w-full h-[30vh] md:h-[40vh] overflow-hidden rounded-xl shadow-inner mb-6">
              <img
                src="https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Travel stories"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-all duration-700"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
                Create Your Travel Stories
              </h2>
              
              <p className="text-cyan-50 text-sm md:text-base">
                Record your travel experiences and memories in your travel journey.
              </p>
              
              <div className="pt-2">
                <div className="flex items-center space-x-4 mt-4 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-700 text-xs font-bold">JD</div>
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">ML</div>
                    <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-xs font-bold">KS</div>
                  </div>
                  <p className="text-white text-sm">Join 10k+ travelers documenting their journeys</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className={`w-full md:w-1/2 lg:w-2/5 bg-white rounded-b-2xl md:rounded-2xl shadow-xl relative p-6 sm:p-8 md:p-10 transition-all duration-1000 delay-500 ease-out ${showAnimation ? 'translate-y-0' : 'translate-y-20'}`}>
          <form onSubmit={handleSignUp} className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h3>
            <p className="text-gray-500 mb-6">Start your journey with us today</p>

            <div className={`space-y-4 transition-all duration-500 delay-700 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="w-full"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-fadeIn">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                  </div>
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                >
                  Create Account
                </button>
              )}

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <p className="text-xs text-gray-400 px-3">Already have an account?</p>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                onClick={() => navigate("/login")}
              >
                <span className="mr-2">🔑</span>
                Sign In Instead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp