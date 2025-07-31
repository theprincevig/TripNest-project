// Importing mongoose for database modeling
const mongoose = require('mongoose');
// Schema constructor to define data structure
const Schema = mongoose.Schema;
// Importing the Review model to handle related reviews
const Review = require("./review");

// Defining the schema for a listing
const listingSchema = new Schema({
    title: {
        type: String,
        required: true // Title is mandatory
    },
    description: String, // Optional description of the listing
    image: {
        url: String,      // Image URL stored in cloud storage (e.g., Cloudinary)
        filename: String  // Cloud storage filename
    },
    price: Number,        // Price of the listing
    location: String,     // Local address or city
    country: String,      // Country of the listing
    reviews: [{           // Array of ObjectIds referencing Review documents
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {              // Owner of the listing, referencing a User document
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // category: {        // Optional category field (currently commented out)
    //     type: String,
    //     enum: ["Trending", "Rooms", "Amazing pools", "Iconic cities", "Mountains", "Cabins", "Surfing", "Beach", "Camping", "Farms"]
    // }
});

// Mongoose middleware: deletes all related reviews if a listing is deleted
listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Compiling the schema into a model
const Listing = mongoose.model("Listing", listingSchema);

// Exporting the model to be used in other parts of the app
module.exports = Listing;
