import React, { useRef, useState, useEffect } from "react"
import { BsUpload } from "react-icons/bs"
import { MdDelete } from "react-icons/md"

const ImageSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  useEffect(() => {
    if (typeof image === "string") setPreviewUrl(image)
    else if (image) setPreviewUrl(URL.createObjectURL(image))
    else setPreviewUrl(null)
  }, [image])

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gray-800/50 border-2 border-dashed border-gray-700 hover:border-indigo-500/50 transition-all group cursor-pointer">
      <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

      {previewUrl ? (
        <>
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <button 
            onClick={() => setImage(null)}
            className="absolute top-3 right-3 p-2 bg-rose-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
          >
            <MdDelete />
          </button>
        </>
      ) : (
        <div onClick={() => inputRef.current.click()} className="flex flex-col items-center justify-center h-full text-gray-400">
           <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
              <BsUpload size={24} />
           </div>
           <p className="text-sm font-medium">Click to upload photo</p>
        </div>
      )}
    </div>
  )
}

export default ImageSelector