const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => console.log("connection successful"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function initDB() {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "683da2ad1247e189b0ffd526" }));
    await Listing.insertMany(initData.data);
}

initDB();