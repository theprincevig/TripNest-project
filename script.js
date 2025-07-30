if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError.js');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

/* EXPRESS SESSION & CONNECT_MONGO */
const session = require('express-session');
const MongoStore = require('connect-mongo');

/* require routes */
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

const mongoose = require('mongoose');
const DB_URL = process.env.ATLASDB_URL;

main().then(() => console.log("connection successful"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect(DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log(`ERROR in mongo session store ${err}`);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());

/* PASSPORT */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/* END PASSPORT */


// flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});


// default page for wanderlust website...
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// using routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// throw error if user send the request of unmatched route
app.all("/{*any}", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// middleware....
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!!" } = err;
    res.status(status).render("error.ejs", { status, message });
});

app.listen(8080, () => console.log('listening server to port 8080'));