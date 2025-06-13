import React, { useState, useEffect } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentUser } from "../../redux/slice/userSlice"
import { useNavigate } from "react-router-dom"

const ProfileEdit = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    profilePicture: currentUser?.profilePicture || "",
  })
  const [preview, setPreview] = useState(currentUser?.profilePicture || "")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      profilePicture: currentUser?.profilePicture || "",
    })
    setPreview(currentUser?.profilePicture || "")
  }, [currentUser])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    setPreview(file ? URL.createObjectURL(file) : form.profilePicture)
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
      navigate("/")
    } catch (err) {
      alert("Update failed")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-emerald-200 shadow-lg hover:shadow-xl transition">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-400">+</span>
              )}
            </div>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <span className="text-xs text-gray-500 mt-2">Click to change profile picture</span>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow hover:from-emerald-600 hover:to-teal-600 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit