import multer from "multer";
import path from "path";

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  console.log("Uploading file:", file.originalname);
  console.log("Detected extension:", ext);

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    console.log("File rejected: Not an allowed image format!");
    cb(new Error("Only images are allowed!"));
  }
};

// Upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
});
 