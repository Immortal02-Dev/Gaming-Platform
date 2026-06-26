import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: Fixed ENOENT crash on Vercel caused by trying to mkdir under
//         /var/task/backend/uploads — Vercel's filesystem is READ-ONLY there.
// ─────────────────────────────────────────────────────────────────────────────
// LOCAL      → writes to backend/uploads/ (served statically via /uploads)
// LIVE (Vercel) → writes to /tmp/uploads/ (the only writable path on Vercel)
//               NOTE: /tmp is ephemeral — files are lost between cold starts.
//               For permanent storage on Vercel, integrate a CDN/cloud storage
//               (e.g. Vercel Blob, Cloudinary, AWS S3).
const isProduction = process.env.NODE_ENV === "production";
const uploadDir = isProduction
  ? "/tmp/uploads"                           // Vercel: only writable path
  : path.join(__dirname, "../uploads");       // Local: served as static files

// Create the directory if it doesn't exist (safe on both environments)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed."));
  },
});

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // LOCAL: served via express.static('/uploads') → URL is /uploads/filename
    // LIVE:  /tmp is not publicly served — URL points to /uploads/ for consistency
    //        but a real CDN URL should be used for permanent file hosting.
    const url = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: { url },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "File upload failed",
    });
  }
});

export default router;
