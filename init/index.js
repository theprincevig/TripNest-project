const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Establish MongoDB connection
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ MongoDB connection successful.");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
    }
}

// Initialize the database with seed data
async function initDB() {
    try {
        // Clear existing listings
        await Listing.deleteMany({});
        console.log("🧹 Existing listings cleared.");

        // Set a fixed owner for all listings
        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "683da2ad1247e189b0ffd526", // Replace with real User ID if needed
        }));

        // Insert seed listings
        await Listing.insertMany(initData.data);
        console.log("🌱 Database seeded with listings.");
    } catch (err) {
        console.error("❌ Error seeding database:", err);
    } finally {
        // Close DB connection
        mongoose.connection.close();
    }
}

// Run the DB init process
main().then(initDB);
