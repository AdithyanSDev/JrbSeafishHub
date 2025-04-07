"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define storage for uploaded images
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file
    },
});
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    console.log("Uploading file:", file.originalname);
    console.log("Detected extension:", ext);
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    }
    else {
        console.log("File rejected: Not an allowed image format!");
        cb(new Error("Only images are allowed!"));
    }
};
// Upload middleware
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
});
