const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../models/schema.js");
const ExpressError = require("./expressError.js");

// listing validation
module.exports.validateListing = (req, res, next) => {
    if (req.body.listing && req.body.listing.price) {
        req.body.listing.price = Number(req.body.listing.price);
    }
    let { error } = listingSchema.validate(req.body); // validate the whole body
    if (error) {
        let errMsg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// review validtaion
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body.listing);
    if (error) {
        let errMsg = error.details.map((e) => e.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// check is the user logged in on website or not
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// check is the current user the owner of listing or not
module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You're not a owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// check is the current user the author of review or not
module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You can't deleted someones review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}