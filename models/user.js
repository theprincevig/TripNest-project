// Import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true  // Email is required for user registration
    }
});

// Add username, hash & salt fields and authentication methods to schema
userSchema.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model("User", userSchema);
