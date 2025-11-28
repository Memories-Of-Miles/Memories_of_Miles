import React, { useState, useEffect } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentUser } from "../../redux/slice/userSlice"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { toast } from "react-toastify"
import { FaUser, FaEnvelope, FaCamera } from "react-icons/fa"

const ProfileEdit = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    profilePicture: "",
  })
  
  const [preview, setPreview] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // Populate form with current user data
  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser.username || "",
        email: currentUser.email || "",
        profilePicture: currentUser.profilePicture || "",
      })
      setPreview(currentUser.profilePicture || "")
    }
  }, [currentUser])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData()
    formData.append("username", form.username)
    formData.append("email", form.email)
    if (file) formData.append("profilePicture", file)
    
    try {
      const res = await axiosInstance.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      
      dispatch(setCurrentUser(res.data.user))
      toast.success("Profile updated successfully!")
      setTimeout(() => navigate("/dashboard"), 1500)
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-display overflow-x-hidden pb-20">
      
      {/* Reusing Navbar for consistency (pass dummy props if needed or update Navbar to handle defaults) */}
      <Navbar 
        searchQuery="" 
        setSearchQuery={() => {}} 
        onSearchNote={() => {}} 
        handleClearSearch={() => {}} 
      />

      <div className="container mx-auto px-4 py-12 relative z-10 flex justify-center">
        {/* Decorative Background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg glass-card rounded-3xl p-8 md:p-10 border border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-2xl animate-fade-in-scale relative">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
            <p className="text-gray-400 text-sm">Update your personal details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-8 group">
              <label htmlFor="profilePicture" className="cursor-pointer relative">
                <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-gray-700 group-hover:border-indigo-500 shadow-xl transition-all duration-300 relative">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="text-4xl text-gray-500 font-bold">
                        {form.username ? form.username.charAt(0).toUpperCase() : "?"}
                    </span>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaCamera className="text-white text-2xl drop-shadow-lg" />
                  </div>
                </div>
                
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 border-4 border-gray-900 shadow-lg transform translate-x-1 translate-y-1">
                    <FaCamera className="text-white text-xs" />
                </div>
              </label>
              <span className="text-xs text-gray-500 mt-3 group-hover:text-indigo-400 transition-colors">Tap to change photo</span>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="relative group">
                <FaUser className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
                  required
                />
              </div>

              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit