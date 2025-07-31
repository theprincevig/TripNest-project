// Import required modules and utilities
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../utils/middleware.js');
const listingController = require('../controller/listings.js');

// Multer setup for handling image uploads
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage }); // Store uploaded files in configured cloud storage

// ROUTES

// Handle GET (list all listings) and POST (create new listing) at root URL
router.route("/")
  .get(wrapAsync(listingController.home)) // Show all listings
  .post(
    isLoggedIn, // Ensure user is logged in
    upload.single('listing[image]'), // Handle single image upload
    validateListing, // Validate listing data
    wrapAsync(listingController.newListing) // Create new listing
  );

// Render form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Handle GET (view), PATCH (update), and DELETE (remove) for a specific listing by ID
router.route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show listing details
  .patch(
    isLoggedIn, // Ensure user is logged in
    isOwner, // Ensure user is owner of the listing
    upload.single('listing[image]'), // Handle optional image upload
    validateListing, // Validate updated data
    wrapAsync(listingController.updateListing) // Update listing
  )
  .delete(
    isLoggedIn, // Ensure user is logged in
    isOwner, // Ensure user is owner of the listing
    wrapAsync(listingController.deleteListing) // Delete listing
  );

// Render edit form for a specific listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Export router to use in main app
module.exports = router;
