// Import required modules and middleware
const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../utils/middleware.js');
const userController = require('../controller/users.js');

// Middleware for authenticating user using passport-local strategy
// If login fails, redirect to /login with a flash message
const userExist = passport.authenticate("local", {
    failureRedirect: '/login',
    failureFlash: true
});

// ROUTES

// Route to handle user signup
router.route("/signup")
    .get(userController.signupForm)                // Render signup form
    .post(wrapAsync(userController.signupUser));   // Handle user signup logic

// Route to handle user login
router.route("/login")
    .get(userController.loginForm)                         // Render login form
    .post(
        saveRedirectUrl,                                   // Middleware to store return URL
        userExist,                                         // Authenticate user
        wrapAsync(userController.loginUser)                // Handle login logic
    );

// Route to handle user logout
router.get("/logout", userController.logoutUser);          // Log out the user and redirect

// Export router to use in main app
module.exports = router;
