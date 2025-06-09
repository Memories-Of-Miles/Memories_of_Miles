import { fileURLToPath } from "url"
import TravelStory from "../models/travelStory.model.js"
import { errorHandler } from "../utils/error.js"
import path from "path"
import fs from "fs"

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

export const addTravelStory = async (req, res, next) => {
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body

  const userId = req.user.id

  //   validate required field
  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return next(errorHandler(400, "All fields are required"))
  }

  //   convert visited date from milliseconds to Date Object
  const parsedVisitedDate = new Date(parseInt(visitedDate))

  try {
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    })

    await travelStory.save()

    res.status(201).json({
      story: travelStory,
      message: "You story is added successfully!",
    })
  } catch (error) {
    next(error)
  }
}

export const getAllTravelStory = async (req, res, next) => {
  const userId = req.user.id

  try {
    const travelStories = await TravelStory.find({ userId: userId }).sort({
      isFavorite: -1,
    })

    res.status(200).json({ stories: travelStories })
  } catch (error) {
    next(error)
  }
}

export const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"))
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

    res.status(201).json({ imageUrl })
  } catch (error) {
    next(error)
  }
}

export const deleteImage = async (req, res, next) => {
  const { imageUrl } = req.query

  if (!imageUrl) {
    return next(errorHandler(400, "imageUrl parameter is required!"))
  }

  try {
    // extract the file name from the imageUrl
    const filename = path.basename(imageUrl)

    // Delete the file path
    const filePath = path.join(rootDir, "uploads", filename)

    console.log(filePath)

    // check if the file exists
    if (!fs.existsSync(filePath)) {
      return next(errorHandler(404, "Image not found!"))
    }

    // delete the file
    await fs.promises.unlink(filePath)

    res.status(200).json({ message: "Image deleted successfully!" })
  } catch (error) {
    next(error)
  }
}

export const editTravelStory = async (req, res, next) => {
  const { id } = req.params
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body
  const userId = req.user.id

  // validate required field
  if (!title || !story || !visitedLocation || !visitedDate) {
    return next(errorHandler(400, "All fields are required"))
  }

  //   convert visited date from milliseconds to Date Object
  const parsedVisitedDate = new Date(parseInt(visitedDate))

  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId })

    if (!travelStory) {
      return next(errorHandler(404, "Travel Story not found!")) // Added return here
    }

    const placeholderImageUrl = `http://localhost:3000/assets/placeholderImage.png`

    travelStory.title = title
    travelStory.story = story
    travelStory.visitedLocation = visitedLocation
    travelStory.imageUrl = imageUrl || placeholderImageUrl
    travelStory.visitedDate = parsedVisitedDate

    await travelStory.save()

    res.status(200).json({
      story: travelStory,
      message: "Travel story updated successfully!",
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTravelStory = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  console.log('Delete request - Story ID:', id)
  console.log('Delete request - User ID:', userId)

  // Validate MongoDB ObjectId format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      error: true,
      message: "Invalid story ID format"
    })
  }

  try {
    // Find and delete in one operation
    const travelStory = await TravelStory.findOneAndDelete({ 
      _id: id, 
      userId: userId 
    })

    console.log('Story found and deleted:', !!travelStory)

    if (!travelStory) {
      return res.status(404).json({
        error: true,
        message: "Travel Story not found or you don't have permission to delete it!"
      })
    }

    // Handle image cleanup after successful deletion
    const placeholderImageUrl = `http://localhost:3000/assets/placeholderImage.png`
    const imageUrl = travelStory.imageUrl

    console.log('Image URL:', imageUrl)

    if (imageUrl && imageUrl !== placeholderImageUrl) {
      try {
        const filename = path.basename(imageUrl)
        const filePath = path.join(rootDir, "uploads", filename)
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath)
          console.log(`Image file deleted: ${filename}`)
        }
      } catch (imageError) {
        console.error("Error deleting image file:", imageError)
      }
    }

    console.log('Sending success response')
    res.status(200).json({ 
      error: false,
      message: "Travel story deleted successfully!" 
    })

  } catch (error) {
    console.error("Error deleting travel story:", error)
    console.error("Error stack:", error.stack)
    
    res.status(500).json({
      error: true,
      message: "Internal server error while deleting story"
    })
  }
}

export const updateIsFavourite = async (req, res, next) => {
  const { id } = req.params
  const { isFavorite } = req.body
  const userId = req.user.id

  try {
    const travelStory = await TravelStory.findOne({ _id: id, userId: userId })

    if (!travelStory) {
      return next(errorHandler(404, "Travel story not found!"))
    }

    travelStory.isFavorite = isFavorite

    await travelStory.save()

    res
      .status(200)
      .json({ story: travelStory, message: "Updated successfully!" })
  } catch (error) {
    next(error)
  }
}

export const searchTravelStory = async (req, res, next) => {
  const { query } = req.query
  const userId = req.user.id

  if (!query) {
    return next(errorHandler(404, "Query is required!"))
  }

  try {
    const searchResults = await TravelStory.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavorite: -1 })

    res.status(200).json({
      stories: searchResults,
    })
  } catch (error) {
    next(error)
  }
}

export const filterTravelStories = async (req, res, next) => {
  const { startDate, endDate } = req.query
  const userId = req.user.id

  try {
    const start = new Date(parseInt(startDate))
    const end = new Date(parseInt(endDate))

    const filteredStories = await TravelStory.find({
      userId: userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavorite: -1 })

    res.status(200).json({ stories: filteredStories })
  } catch (error) {
    next(error)
  }
}

