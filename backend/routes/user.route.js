import express from "express"
import { updateUserProfile } from "../controllers/user.controller.js"
import { authenticateToken } from "../middleware/auth.js"
import multer from "multer"

const router = express.Router()
const upload = multer({ dest: "uploads/profile_pics/" })

router.put("/profile", authenticateToken, upload.single("profilePicture"), updateUserProfile)

export default router