import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { MdOutlineDeleteOutline, MdOutlineUpdate } from "react-icons/md"
import DateSelector from "./DateSelector"
import ImageSelector from "./ImageSelector"
import TagInput from "./TagInput"
import axiosInstance from "../utils/axiosInstance"
import moment from "moment"
import { toast } from "react-toastify"
import uploadImage from "../utils/uploadImage"

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [title, setTitle] = useState(storyInfo?.title || "")
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
  const [story, setStory] = useState(storyInfo?.story || "")
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  )

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addNewTravelStory = async () => {
    try {
      let imageUrl = ""

      // Upload image if present
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg)

        imageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/travel-story/add", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      })

      if (response.data && response.data.story) {
        toast.success("Story added successfully!")

        getAllTravelStories()

        onClose()
      }
    } catch (error) {
      console.log(error)
      setError("Failed to add story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTravelStory = async () => {
    const storyId = storyInfo._id

    try {
      let imageUrl = ""

      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      }

      if (typeof storyImg === "object") {
        // Upload new image
        const imageUploadRes = await uploadImage(storyImg)

        imageUrl = imageUploadRes.imageUrl || ""

        postData = {
          ...postData,
          imageUrl: imageUrl,
        }
      }

      const response = await axiosInstance.post(
        "/travel-story/edit-story/" + storyId,
        postData
      )

      if (response.data && response.data.story) {
        toast.success("Story updated successfully!")

        getAllTravelStories()

        onClose()
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong! Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    if (!title.trim()) {
      setError("Please enter the title")
      return false
    }

    if (!story.trim()) {
      setError("Please enter the story")
      return false
    }

    if (visitedLocation.length === 0) {
      setError("Please add at least one visited location")
      return false
    }

    if (!visitedDate) {
      setError("Please select when you visited")
      return false
    }

    setError("")
    return true
  }

  const handleAddOrUpdateClick = () => {
    if (validateForm()) {
      if (type === "edit") {
        updateTravelStory()
      } else {
        addNewTravelStory()
      }
    }
  }

  const handleDeleteStoryImage = async () => {
    // Deleting the image
    const deleteImageResponse = await axiosInstance.delete(
      "/travel-story/delete-image",
      {
        params: {
          imageUrl: storyInfo.imageUrl,
        },
      }
    )

    if (deleteImageResponse.data) {
      const storyId = storyInfo._id

      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
      }

      // updating story

      const response = await axiosInstance.post(
        "/travel-story/edit-story/" + storyId,
        postData
      )

      if (response.data) {
        toast.success("Story image deleted successfully")

        setStoryImg(null)

        getAllTravelStories()
      }
    }
  }

  const handleDeleteStory = async () => {
    if (window.confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      try {
        const response = await axiosInstance.delete(`/travel-story/delete-story/${storyInfo._id}`);
        
        if (response.data && !response.data.error) {
          toast.success("Story deleted successfully!");
          getAllTravelStories();
          onClose();
        }
      } catch (error) {
        console.error("Error deleting story:", error);
        setError("Failed to delete story. Please try again.");
      }
    }
  }

  const resetForm = () => {
    setTitle(storyInfo?.title || "");
    setStory(storyInfo?.story || "");
    setVisitedDate(storyInfo?.visitedDate || null);
    setVisitedLocation(storyInfo?.visitedLocation || []);
    setStoryImg(storyInfo?.imageUrl || null);
    setError("");
  };

  const hasUnsavedChanges = () => {
    if (type === "add") {
      return title !== "" || story !== "" || visitedLocation.length > 0 || storyImg !== null;
    } else {
      return title !== storyInfo?.title || 
             story !== storyInfo?.story || 
             JSON.stringify(visitedLocation) !== JSON.stringify(storyInfo?.visitedLocation) ||
             storyImg !== storyInfo?.imageUrl;
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges() && !window.confirm("You have unsaved changes. Are you sure you want to close?")) {
      return;
    }
    onClose();
  };

  return (
    <div className="relative bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl mx-auto p-6 sm:p-8 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-600/50">
        <h5 className="text-2xl font-bold text-white flex items-center space-x-2">
          {type === "add" ? (
            <>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-lg flex items-center justify-center">
                <IoMdAdd className="text-white text-lg" />
              </div>
              <span>Add New Story</span>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-lg flex items-center justify-center">
                <MdOutlineUpdate className="text-white text-lg" />
              </div>
              <span>Update Story</span>
            </>
          )}
        </h5>

        <div className="flex items-center space-x-3">
          {type === "add" ? (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={handleAddOrUpdateClick}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {type === "add" ? "ADDING..." : "UPDATING..."}
                </span>
              ) : (
                <>
                  {type === "add" ? <IoMdAdd className="text-lg" /> : <MdOutlineUpdate className="text-lg" />}
                  <span>{type === "add" ? "ADD STORY" : "UPDATE"}</span>
                </>
              )}
            </button>
          ) : (
            <>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleAddOrUpdateClick}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {type === "add" ? "ADDING..." : "UPDATING..."}
                  </span>
                ) : (
                  <>
                    {type === "add" ? <IoMdAdd className="text-lg" /> : <MdOutlineUpdate className="text-lg" />}
                    <span>{type === "add" ? "ADD STORY" : "UPDATE"}</span>
                  </>
                )}
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => handleDeleteStory()}
              >
                <MdOutlineDeleteOutline className="text-lg" />
                <span>DELETE</span>
              </button>
            </>
          )}

          <button
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-all duration-300"
            onClick={handleClose}
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border-l-4 border-red-500 rounded-xl flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-red-400 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
          <span className="text-sm font-medium text-red-300">{error}</span>
        </div>
      )}

      {/* Form Content */}
      <div className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
            TITLE
          </label>
          <input
            type="text"
            className="w-full text-2xl font-bold text-white bg-transparent border-b-2 border-slate-600 focus:border-sky-500 outline-none transition-colors duration-300 py-2 placeholder-slate-500"
            placeholder="Once Upon A Time..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
            VISITED DATE
          </label>
          <DateSelector
            date={visitedDate}
            onDateChange={setVisitedDate}
            className="bg-slate-700/50 border-slate-600 text-white"
          />
        </div>

        {/* Image Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
            STORY IMAGE
          </label>
          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImage={handleDeleteStoryImage}
            className="bg-slate-700/50 border-slate-600"
          />
        </div>

        {/* Story Textarea */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
            STORY
          </label>
          <textarea
            className="w-full text-sm text-white bg-slate-700/50 border-2 border-slate-600 focus:border-sky-500 rounded-xl p-4 outline-none transition-all duration-300 resize-none placeholder-slate-400"
            placeholder="Tell us about your amazing adventure..."
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {/* Visited Locations */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
            VISITED LOCATIONS
          </label>
          <TagInput 
            tags={visitedLocation} 
            setTags={setVisitedLocation} 
            className="bg-slate-700/50 border-slate-600 text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default AddEditTravelStory