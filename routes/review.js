const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../utils/middleware.js');
const reviewController = require('../controller/reviews.js');


// add reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

// delete reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;