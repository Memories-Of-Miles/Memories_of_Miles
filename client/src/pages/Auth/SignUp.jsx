import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import PasswordInput from "../../components/PasswordInput"
import Footer from "../../components/Footer"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Local loading state for signup button

  const { currentUser } = useSelector((state) => state.user)

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
  }, [currentUser, navigate])

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) return setError("Please enter your name.")
    if (!validateEmail(email)) return setError("Please enter a valid email address.")
    if (!password) return setError("Please enter your password.")

    setError(null)
    setLoading(true)

    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      })

      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-display overflow-x-hidden flex flex-col">
      
      {/* --- Simple Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Icon & Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-white">Memoirs</span>
              <span className="text-gray-400 mx-1">of</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                Miles
              </span>
            </h1>
          </div>

          {/* Right: Login Button */}
          <button 
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full border border-gray-700"
          >
            Login
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative">
        {/* Background Blobs */}
        <div className="absolute top-20 left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 glass rounded-3xl overflow-hidden shadow-2xl animate-fade-in-scale relative z-10">
          
          {/* Left Side - Visual */}
          <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-900/50 to-gray-900/50 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-semibold text-indigo-200 border border-white/10">
                Join our community
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Start Your Journey <br /> Today.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Create an account to unlock full access to our travel journaling tools. Document, share, and relive your adventures.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-gray-700 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Join 10,000+ travelers</p>
              </div>
            </div>
            
            {/* Abstract Background Image */}
            <img 
              src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Mountain Landscape" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" 
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-900/60 backdrop-blur-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm">Enter your details below to get started</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                />
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary w-full mt-2 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-500">
                By registering, you agree to our{" "}
                <span className="text-indigo-400 cursor-pointer hover:underline" onClick={() => navigate("/terms-of-service")}>Terms</span> &{" "}
                <span className="text-indigo-400 cursor-pointer hover:underline" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignUp