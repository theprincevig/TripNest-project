// Load environment variables from .env file if not in production mode
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

/* ======================
   Import Required Modules
   ====================== */
const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); // Layout support for EJS templates
const ExpressError = require('./utils/expressError.js'); // Custom error class
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

/* ========================
   Session and MongoDB Setup
   ======================== */
const session = require('express-session');
const MongoStore = require('connect-mongo');

/* ============
   App Routing
   ============ */
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

/* ===================
   MongoDB Connection
   =================== */
const mongoose = require('mongoose');
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // Uncomment for Local MongoDB URL
const DB_URL = process.env.ATLASDB_URL; // cloud MongoDB

// Connect to MongoDB
main().then(() => console.log("connection successful"))
      .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(DB_URL);
}

/* =====================
   View Engine & Static
   ===================== */
app.set("view engine", "ejs"); // Set EJS as view engine
app.set("views", path.join(__dirname, "/views")); // Set path for views
app.engine("ejs", ejsMate); // Use ejs-mate for layouts

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method")); // Support PUT/DELETE via query string
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files

/* ========================
   Session Configuration
   ======================== */
const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", () => {
    console.log(`ERROR in mongo session store`);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true // Helps prevent XSS attacks
    }
}

app.use(session(sessionOptions));
app.use(flash());

/* ==================
   Passport Setup
   ================== */
app.use(passport.initialize());
app.use(passport.session());

// Use Local Strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ===========================
   Flash Middleware (Globals)
   =========================== */
app.use((req, res, next) => {
    res.locals.success = req.flash("success"); // flash message for success
    res.locals.error = req.flash("error");     // flash message for errors
    res.locals.currentUser = req.user;         // store current user globally
    next();
});

/* ====================
   Root/Home Route
   ==================== */
app.get("/", (req, res) => {
    res.render("index.ejs");
});

/* ====================
   Mount Route Handlers
   ==================== */
app.use("/listings", listingRouter); // All listing routes
app.use("/listings/:id/reviews", reviewRouter); // Review routes nested under listing
app.use("/", userRouter); // Auth routes (register, login, logout)

/* ============================
   Handle Undefined Routes (404)
   ============================ */
app.all("/{*any}", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

/* ========================
   Centralized Error Handler
   ======================== */
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!!" } = err;
    res.status(status).render("error.ejs", { status, message });
});

/* ====================
   Start Express Server
   ==================== */
app.listen(8080, () => console.log('listening server to port 8080'));
