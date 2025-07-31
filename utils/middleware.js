const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../models/schema.js");
const ExpressError = require("./expressError.js");

// Middleware to validate listing data using Joi schema
module.exports.validateListing = (req, res, next) => {
    if (req.body.listing && req.body.listing.price) {
        req.body.listing.price = Number(req.body.listing.price); // Ensure price is a number
    }

    let { error } = listingSchema.validate(req.body); // Validate the request body
    if (error) {
        let errMsg = error.details.map((e) => e.message).join(","); // Combine all error messages
        throw new ExpressError(400, errMsg); // Throw custom error if validation fails
    } else {
        next(); // Proceed if validation passes
    }
}

// Middleware to validate review data using Joi schema
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body.listing); // Validate review part of the body
    if (error) {
        let errMsg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // If user is not authenticated
        req.session.redirectUrl = req.originalUrl; // Save the URL they tried to access
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
}

// Middleware to make redirect URL accessible in views after login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You're not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You can't delete someone else's review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
