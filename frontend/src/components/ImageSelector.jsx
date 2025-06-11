import React, { useEffect, useRef, useState } from "react"
import { BsUpload } from "react-icons/bs"
import { MdDeleteOutline } from "react-icons/md"

const ImageSelector = ({ image, setImage, handleDeleteImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  const handleRemoveImage = () => {
    setImage(null)
    handleDeleteImage()
  }

  useEffect(() => {
    // if the image prop is a string(url), set it as the preview URL
    if (typeof image === "string") {
      setPreviewUrl(image)
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image))
    } else {
      setPreviewUrl(null)
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [image])

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <button
          className="w-full h-60 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-200 hover:border-emerald-300 rounded-xl transition-all duration-300 hover:scale-[1.02] group"
          onClick={() => onChooseFile()}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            <BsUpload className="text-2xl text-white" />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-emerald-700 mb-1">
              Upload Image
            </p>
            <p className="text-sm text-gray-600">Browse image files to upload</p>
            <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, GIF</p>
          </div>
        </button>
      ) : (
        <div className="w-full relative group">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={previewUrl}
              alt="Selected travel photo"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay for better button visibility */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Delete button */}
            <button
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100"
              onClick={handleRemoveImage}
              title="Remove image"
            >
              <MdDeleteOutline className="text-lg" />
            </button>
          </div>

          {/* Image info */}
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm text-gray-600">
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
              <button
                onClick={() => onChooseFile()}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-300"
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
