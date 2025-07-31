// Importing mongoose for database interaction
const mongoose = require('mongoose');
// Schema constructor to define the structure of documents
const Schema = mongoose.Schema;

// Defining the schema for a review
const reviewSchema = new Schema({
    comment: String, // Textual feedback from the user

    rating: {        // Rating value between 1 and 5
        type: Number,
        min: 1,
        max: 5
    },

    created_at: {    // Timestamp when the review is created
        type: Date,
        default: Date.now() // Automatically set to current date/time
    },

    author: {        // Reference to the User who wrote the review
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// Exporting the Review model based on the defined schema
module.exports = mongoose.model("Review", reviewSchema);
