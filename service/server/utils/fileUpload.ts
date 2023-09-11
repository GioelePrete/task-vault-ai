import multer from 'multer';
import {Request} from 'express';

// Configure multer to handle file uploads
// Multer is a middleware for handling multipart/form-data, commonly used for file uploads.

// Define a storage configuration for uploaded files
const storage = multer.diskStorage({
    // Set the destination directory for storing uploaded files
    destination: (req: Request, file, cb) => {
        cb(null, 'public/assets'); // The uploaded files will be stored in the 'public/assets' directory.
    },
    // Define the filename for each uploaded file
    filename: (req: Request, file, cb) => {
        // Generate a unique filename based on the current timestamp and original filename
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

// Create a multer instance with the configured storage
const upload = multer({storage});

export default upload;
