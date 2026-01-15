import multer from "multer";
import S3Storage from "./multerS3Storage.js";
import dotenv from "dotenv";

dotenv.config();

// Configure multer to use custom S3 storage
const upload = multer({
  storage: new S3Storage({
    bucket: process.env.AWS_BUCKET_NAME,
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
});

export default upload;