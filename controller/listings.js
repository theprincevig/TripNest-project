const Listing = require("../models/listing");

// home page
module.exports.home = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/home.ejs", { listings });
}

// create new
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}
module.exports.newListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "Your listing created successfully!");
    res.redirect("/listings");
}

// edit listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Deleted listing doesn't existed!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    req.flash("success", "Your listing updated successfully!");
    res.redirect(`/listings/${id}`);
}

// delete listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Your listing deleted successfully!");
    res.redirect("/listings");
}

// show listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Deleted listing doesn't existed!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}