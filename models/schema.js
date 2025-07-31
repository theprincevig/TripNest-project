// Import Joi for schema validation
const Joi = require('joi');

// Joi schema to validate listing data submitted from forms
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),              // Title is required and must be a string
        description: Joi.string().required(),        // Description is required
        image: Joi.string().allow("", null),         // Image is optional; allows empty string or null
        price: Joi.number().required().min(0),       // Price must be a number >= 0
        location: Joi.string().required(),           // Location is required
        country: Joi.string().required()             // Country is required
    }).required()                                     // 'listing' object must be present
});

// Joi schema to validate review data
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),  // Rating must be between 1 and 5
        comment: Joi.string().required()                // Comment is required
    }).required()                                       // 'review' object must be present
});
