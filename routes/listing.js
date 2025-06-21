const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../utils/middleware.js');
const listingController = require('../controller/listings.js');

// require multer for save a image file
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.home))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.newListing));

// create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.patch(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// update listings
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;