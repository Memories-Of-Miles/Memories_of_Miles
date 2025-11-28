import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../../redux/slice/userSlice"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import PasswordInput from "../../components/PasswordInput"
import Footer from "../../components/Footer"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) return setError("Invalid email address.")
    if (!password) return setError("Password is required.")
    
    setError(null)
    setLoading(true)
    dispatch(signInStart())
    
    try {
      const response = await axiosInstance.post("/auth/signin", { email, password })
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token)
        dispatch(signInSuccess(response.data.user))
        navigate("/dashboard")
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed"
      dispatch(signInFailure(errorMsg))
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-display overflow-x-hidden flex flex-col">
      
      {/* --- Navbar --- */}
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

          {/* Right: Register Button */}
          <button 
            onClick={() => navigate("/sign-up")}
            className="bg-gray-100 hover:bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Register
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
                Welcome Back
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Your Adventure <br /> Continues.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Log in to revisit your favorite moments, explore your pinned locations, and add new chapters to your story.
              </p>
            </div>
            
            {/* Abstract Background Image */}
            <img 
              src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Travel" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-900/60 backdrop-blur-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400 text-sm">Access your account details</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                 <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Password</label>
                 <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
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
                className="btn-primary w-full shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login