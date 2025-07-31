// Import Cloudinary SDK and Multer Cloudinary storage adapter
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,       // Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY,       // Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET  // Cloudinary API secret
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Pass the configured cloudinary instance
  params: {
    folder: 'wanderlust_DEV',               // Folder name where files will be stored
    allowedFormats: ["png", "jpg", "jpeg"]  // Allowed image file types
  },
});

// Export both the cloudinary instance and the storage object
module.exports = { cloudinary, storage };
