const User = require('../models/user.js');

// sign up user
module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signupUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Signed Up successfully, Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

// login user
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.loginUser = async (req, res) => {
    req.flash("success", "Logged In successfully, Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// logout user
module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You're logged out from Wanderlust!");
        res.redirect("/listings");
    });
}