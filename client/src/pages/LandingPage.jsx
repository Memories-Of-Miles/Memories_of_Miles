import React from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer" // Ensure you have this component

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white font-display overflow-x-hidden">
      
      {/* --- Landing Navbar --- */}
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

          {/* Right: Register Button Only */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/sign-up")}
              className="bg-gray-100 hover:bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center text-center">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in-scale">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
             The Ultimate Travel Companion
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
             Your Journey, <br />
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
               Beautifully Documented.
             </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Capture every sunset, every street corner, and every emotion. 
            Memoirs of Miles is the digital sanctuary for your travel stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => navigate("/sign-up")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Start Your Journal
            </button>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 bg-gray-900/50 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Travelers Love Us</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Everything you need to keep your memories alive, in one secure place.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group">
                 <div className="w-14 h-14 bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                    ✈️
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Track Your Travels</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Log visited locations automatically and visualize your journey across the globe with interactive tags.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-pink-500/30 transition-all hover:shadow-2xl hover:shadow-pink-500/10 group">
                 <div className="w-14 h-14 bg-pink-900/50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                    📸
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Visual Stories</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Upload high-resolution photos to accompany your thoughts. A picture is worth a thousand words.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/10 group">
                 <div className="w-14 h-14 bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                    🔒
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Secure & Private</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Your memories are yours alone. We use industry-standard encryption to keep your diary private.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <Footer />
    </div>
  )
}

export default LandingPage