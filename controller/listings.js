const Listing = require("../models/listing");

/* ==============================
   Controller: Listings
   ============================== */

// GET: Render Home Page with All Listings
module.exports.home = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/home.ejs", { listings });
};

// GET: Render Form to Create a New Listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// POST: Handle Creation of New Listing
module.exports.newListing = async (req, res) => {
    // Get image data from the uploaded file
    let url = req.file.path;
    let filename = req.file.filename;

    // Create new listing with form data
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set current user as owner
    newListing.image = { url, filename }; // Store image details

    await newListing.save(); // Save to database
    req.flash("success", "Your listing created successfully!");
    res.redirect("/listings");
};

// GET: Render Form to Edit Existing Listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    // Handle case if listing doesn't exist (e.g., was deleted)
    if (!listing) {
        req.flash("error", "Deleted listing doesn't exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
};

// PUT: Handle Listing Update
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    // Update listing with form data
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // If new image is uploaded, update the image field
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Your listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

// DELETE: Handle Listing Deletion
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Your listing deleted successfully!");
    res.redirect("/listings");
};

// GET: Show Details of a Single Listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    // Populate reviews (with authors) and owner details
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    // Handle case if listing doesn't exist
    if (!listing) {
        req.flash("error", "Deleted listing doesn't exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};
