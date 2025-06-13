import React, { useEffect, useRef, useState } from "react"
import { BsUpload } from "react-icons/bs"
import { MdDeleteOutline } from "react-icons/md"

/**
 * ImageSelector Component
 * 
 * A component for selecting, previewing, and managing images for travel stories.
 * Supports uploading new images, displaying existing images, and removing images.
 * 
 * @param {File|string} image - The current image (File object or URL string)
 * @param {Function} setImage - Function to update the image state in parent component
 * @param {Function} handleDeleteImage - Optional function to handle server-side image deletion
 * @param {string} className - Optional additional CSS classes for styling
 */
const ImageSelector = ({ image, setImage, handleDeleteImage, className = "" }) => {
  // Reference to hidden file input element
  const inputRef = useRef(null)
  // State for managing the image preview URL
  const [previewUrl, setPreviewUrl] = useState(null)

  /**
   * Handle file selection from the file input
   * @param {Event} event - The change event from the file input
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  /**
   * Trigger the hidden file input click event
   */
  const onChooseFile = () => {
    inputRef.current.click()
  }

  /**
   * Remove the current image
   * Calls the external delete handler if provided
   */
  const handleRemoveImage = () => {
    if (typeof handleDeleteImage === 'function') {
      handleDeleteImage()
    }
    setImage(null)
  }

  /**
   * Effect to manage image preview URL
   * 
   * - If image is a string URL, use it directly
   * - If image is a File object, create an object URL
   * - Clean up object URLs when component unmounts or image changes
   */
  useEffect(() => {
    // If the image prop is a string (URL), set it as the preview URL
    if (typeof image === "string") {
      setPreviewUrl(image)
    } else if (image) {
      // Create an object URL for File objects
      setPreviewUrl(URL.createObjectURL(image))
    } else {
      // No image, clear preview
      setPreviewUrl(null)
    }

    // Cleanup function to revoke object URLs when component unmounts or image changes
    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [image])

  return (
    <div className="space-y-2">
      {/* Hidden file input element, triggered via button click */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Display upload button when no image is selected */}
      {!image ? (
        <button
          className={`w-full h-60 flex flex-col items-center justify-center gap-4 bg-slate-700/50 border-2 border-dashed border-slate-600 hover:border-sky-400 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${className}`}
          onClick={() => onChooseFile()}
        >
          {/* Upload icon with gradient background */}
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            <BsUpload className="text-2xl text-white" />
          </div>

          {/* Upload instructions */}
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-1">
              Upload Image
            </p>
            <p className="text-sm text-slate-300">Browse image files to upload</p>
            <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, GIF</p>
          </div>
        </button>
      ) : (
        /* Display image preview when an image is selected */
        <div className="w-full relative group">
          {/* Image container with hover effects */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={previewUrl}
              alt="Selected travel photo"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay with gradient for better button visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Delete button */}
            <button
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100"
              onClick={handleRemoveImage}
              title="Remove image"
            >
              <MdDeleteOutline className="text-lg" />
            </button>
          </div>

          {/* Image info panel */}
          <div className="mt-2 p-3 bg-slate-700/50 border border-slate-600 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm text-slate-300">
              {/* Success message */}
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    strokeWidth="2"
                  />
                  <circle cx="9" cy="9" r="2" strokeWidth="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" strokeWidth="2" />
                </svg>
                Image uploaded successfully
              </span>
              
              {/* Change image button */}
              <button
                onClick={() => onChooseFile()}
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors duration-300"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageSelector