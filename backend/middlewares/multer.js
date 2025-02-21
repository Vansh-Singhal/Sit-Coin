import multer from "multer";

// Create and initialise with a memory storage instance
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Use the same upload instance for single file upload
export const singleUpload = upload.single("qr");