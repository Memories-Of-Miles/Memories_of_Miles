import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3 Client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Custom Multer Storage for S3
class S3Storage {
  constructor(options) {
    this.bucket = options.bucket;
    this.acl = options.acl;
  }

  _handleFile(req, file, cb) {
    try {
      // Generate unique filename
      const filename = Date.now().toString() + path.extname(file.originalname);

      // Collect chunks from stream
      const chunks = [];

      file.stream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      file.stream.on("end", async () => {
        try {
          const body = Buffer.concat(chunks);

          // Upload to S3 without ACL
          const uploadParams = {
            Bucket: this.bucket,
            Key: filename,
            Body: body,
            ContentType: file.mimetype,
          };


          const command = new PutObjectCommand(uploadParams);
          await s3.send(command);

          // Return file metadata
          const s3Url = `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

          cb(null, {
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: body.length,
            bucket: this.bucket,
            key: filename,
            location: s3Url,
          });
        } catch (error) {
          console.error("S3 Upload Error:", error);
          cb(error);
        }
      });

      file.stream.on("error", (error) => {
        console.error("Stream Error:", error);
        cb(error);
      });
    } catch (error) {
      console.error("Handle File Error:", error);
      cb(error);
    }
  }

  _removeFile(req, file, cb) {
    // Optional: implement if you want to remove files
    cb(null);
  }
}

export default S3Storage;


