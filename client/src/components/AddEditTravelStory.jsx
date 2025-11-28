import React, { useState } from "react"
import { IoMdClose, IoMdAdd } from "react-icons/io"
import { MdUpdate } from "react-icons/md"
import TagInput from "./TagInput"
import ImageSelector from "./ImageSelector"
import DateSelector from "./DateSelector"
import axiosInstance from "../utils/axiosInstance"
import moment from "moment"
import uploadImage from "../utils/uploadImage"
import { toast } from "react-toastify"

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [title, setTitle] = useState(storyInfo?.title || "")
  const [story, setStory] = useState(storyInfo?.story || "")
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || [])
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddOrUpdateClick = async () => {
    if (!title) return setError("Please enter the title")
    if (!story) return setError("Please enter the story")
    if (!visitedDate) return setError("Please select a date")
    if (!visitedLocation || visitedLocation.length === 0) return setError("Please add at least one location")

    setError("")
    setIsSubmitting(true)

    try {
      let imageUrl = storyImg

      // If storyImg is a file object (new upload), upload it first
      if (typeof storyImg === 'object' && storyImg !== null) {
        const imgUploadRes = await uploadImage(storyImg)
        imageUrl = imgUploadRes.imageUrl || ""
      }

      const payload = {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      }

      let response;
      if (type === "edit") {
        response = await axiosInstance.post("/travel-story/edit-story/" + storyInfo._id, payload)
      } else {
        response = await axiosInstance.post("/travel-story/add", payload)
      }

      if (response.data && response.data.story) {
        toast.success(type === "add" ? "Story added successfully!" : "Story updated successfully!")
        getAllTravelStories()
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStoryImage = async () => {
    try {
      const deleteImageResponse = await axiosInstance.delete("/travel-story/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      })

      if (deleteImageResponse.data) {
        const storyId = storyInfo._id
        const postData = {
          title,
          story,
          visitedLocation,
          visitedDate: moment().valueOf(),
          imageUrl: "",
        }

        await axiosInstance.post("/travel-story/edit-story/" + storyId, postData)
        setStoryImg(null)
      }
    } catch (error) {
        toast.error("Failed to delete image")
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/95 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'add' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-500 to-emerald-600'} shadow-lg`}>
                {type === "add" ? <IoMdAdd className="text-white text-xl" /> : <MdUpdate className="text-white text-xl" />}
           </div>
           <span className="tracking-tight">{type === "add" ? "New Entry" : "Update Story"}</span>
        </h2>
        
        <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-all duration-200"
        >
           <IoMdClose size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
            
            {/* Left Column - Visuals */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Cover Photo</label>
                    <div className="glass-card p-1 rounded-2xl bg-gray-800/30">
                        <ImageSelector 
                            image={storyImg} 
                            setImage={setStoryImg} 
                            handleDeleteImage={handleDeleteStoryImage}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Visited Date</label>
                    <DateSelector date={visitedDate} onDateChange={setVisitedDate} />
                </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6 flex flex-col">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Title</label>
                    <input 
                        type="text" 
                        className="w-full bg-transparent text-3xl font-bold text-white placeholder-gray-700 border-b-2 border-gray-800 focus:border-indigo-500 focus:outline-none py-2 transition-colors"
                        placeholder="A Day in..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Locations</label>
                    <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Your Story</label>
                    <textarea
                        className="w-full flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none min-h-[200px] leading-relaxed"
                        placeholder="Start writing your memories here..."
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
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
            </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-md flex justify-end gap-3">
         <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
         >
            Cancel
         </button>
         <button 
            onClick={handleAddOrUpdateClick} 
            className="btn-primary flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
         >
            {isSubmitting ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                </>
            ) : (
                <>
                    {type === "add" ? <IoMdAdd className="text-xl" /> : <MdUpdate className="text-xl" />}
                    <span>{type === "add" ? "Publish Story" : "Update Story"}</span>
                </>
            )}
         </button>
      </div>
    </div>
  )
}

export default AddEditTravelStory