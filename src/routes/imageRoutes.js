import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    ImageUploadSignature,
    ImageSaver
} from "../controllers/ImageController.js";
import rateLimit from "express-rate-limit";

const ImageRouter = express.Router();

// You can tune limits separately if needed
const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30 // stricter for uploads
});

const saveLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60 // more relaxed
});

// Routes
ImageRouter.post("/upload", uploadLimiter, authMiddleware, ImageUploadSignature);
ImageRouter.post("/save", saveLimiter, authMiddleware, ImageSaver);

export default ImageRouter;