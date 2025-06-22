import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "STRMLY-videos",
    resource_type: "video",
    public_id: (req, file) => file.originalname.split(".")[0]+'-'+Date.now(),
    format: async (req, file) => file.mimetype.split("/")[1],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
  const fileType = file.mimetype.split("/")[1];

  if (allowedTypes.includes(fileType)) {
    cb(null, true); 
  } else {
    cb(new Error("Only video files (mp4, webm, mov, etc.) are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
