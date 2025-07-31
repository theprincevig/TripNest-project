const Listing = require("../models/listing");
const Review = require("../models/review");

/* ============================
   Controller: Review Handling
   ============================ */

// POST: Add a new review to a listing
module.exports.addReview = async (req, res) => {
    // Find the listing by ID
    let listing = await Listing.findById(req.params.id);

    // Create a new review using form data
    let newReview = new Review(req.body.review);

    // Assign the current logged-in user as the author
    newReview.author = req.user._id;

    // Push the review to the listing's reviews array
    listing.reviews.push(newReview);

    // Save both review and updated listing
    await newReview.save();
    await listing.save();

    // Flash message and redirect
    req.flash("success", "Your review added successfully!");
    res.redirect(`/listings/${listing.id}`);
};

// DELETE: Remove a review from a listing
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from the listing using $pull
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document from the Review collection
    await Review.findByIdAndDelete(reviewId);

    // Flash message and redirect
    req.flash("success", "Your review removed successfully!");
    res.redirect(`/listings/${id}`);
};
