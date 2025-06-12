import express from "express"
import { getUsers, signout, updateProfile } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import upload from "../multer.js"

const router = express.Router()

router.get("/getusers", verifyToken, getUsers)
router.post("/signout", signout)
router.put("/profile", verifyToken, upload.single("profilePicture"), updateProfile)

export default router
