const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../utils/middleware.js');
const userController = require('../controller/users.js');


// authenticate middleware
const userExist = passport.authenticate("local", {
    failureRedirect: '/login',
    failureFlash: true
});

// sign-up user
router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signupUser));

// login user
router.route("/login")
.get(userController.loginForm)
.post(saveRedirectUrl, userExist, wrapAsync(userController.loginUser));

// logout user
router.get("/logout", userController.logoutUser);

module.exports = router;