// Import required modules and middleware
const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to :id from parent routes
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../utils/middleware.js');
const reviewController = require('../controller/reviews.js');

// ROUTES

// POST route to add a new review for a specific listing (requires login and valid data)
router.post(
  "/", 
  isLoggedIn,               // Ensure the user is logged in
  validateReview,           // Validate the review data from the form
  wrapAsync(reviewController.addReview) // Controller logic to add review
);

// DELETE route to remove a specific review (requires login and user must be the author)
router.delete(
  "/:reviewId", 
  isLoggedIn,               // Ensure the user is logged in
  isReviewAuthor,           // Check if the user is the author of the review
  wrapAsync(reviewController.deleteReview) // Controller logic to delete review
);

// Export the router to use in main app
module.exports = router;
