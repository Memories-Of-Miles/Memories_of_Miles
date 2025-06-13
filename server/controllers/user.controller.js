import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const getUsers = async (req, res, next) => {
  const userId = req.user.id

  const validUser = await User.findOne({ _id: userId })

  if (!validUser) {
    return next(errorHandler(401, "Unauthorized"))
  }

  const { password: pass, ...rest } = validUser._doc

  res.status(200).json(rest)
}

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been loggedout successfully!")
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  const userId = req.user.id
  const { username, email } = req.body

  try {
    // Find the user by ID
    const user = await User.findById(userId)

    if (!user) {
      return next(errorHandler(404, "User not found"))
    }

    // Update basic info
    user.username = username || user.username
    user.email = email || user.email

    // Handle profile picture upload if provided
    if (req.file) {
      // Create URL for the uploaded image
      const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`
      user.profilePicture = imageUrl
    }

    // Save the updated user
    await user.save()

    // Return user data without password
    const { password, ...userData } = user._doc

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    })
  } catch (error) {
    next(error)
  }
}
