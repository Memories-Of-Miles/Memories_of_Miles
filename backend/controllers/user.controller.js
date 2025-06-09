import User from "../models/user.model.js"
import path from "path"
import fs from "fs"
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

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ error: true, message: "User not found" })
    res.json({ error: false, user })
  } catch (err) {
    res.status(500).json({ error: true, message: "Server error" })
  }
}

export const updateUserProfile = async (req, res) => {
  // Your update logic here
  res.json({ message: "Profile updated!" })
}
