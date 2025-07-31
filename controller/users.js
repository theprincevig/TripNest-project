const User = require('../models/user.js');

/* ============================
   Controller: User Auth System
   ============================ */

/* ================
   Sign Up Section
   ================ */

// GET: Render the sign-up form
module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// POST: Handle new user registration
module.exports.signupUser = async (req, res, next) => {
    try {
        // Destructure user input from the request body
        let { username, email, password } = req.body;

        // Create a new user instance (without password yet)
        const newUser = new User({ email, username });

        // Register the user using passport-local-mongoose
        const registeredUser = await User.register(newUser, password);

        // Auto-login the user after successful registration
        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Signed up successfully, Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (error) {
        // Handle validation or duplicate errors
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

/* ================
   Login Section
   ================ */

// GET: Render the login form
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

// POST: Handle successful login (handled by passport middleware before this)
module.exports.loginUser = async (req, res) => {
    req.flash("success", "Logged in successfully, Welcome back to Wanderlust!");

    // Redirect user to their original requested page or to listings
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

/* =================
   Logout Section
   ================= */

// GET: Log the user out
module.exports.logoutUser = (req, res, next) => {
    // Use passport's logout method
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You're logged out from Wanderlust!");
        res.redirect("/listings");
    });
};
