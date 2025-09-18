const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DBURL);

const db = mongoose.connection;

// If error occurs
db.on("error", console.error.bind(console, "connection error:"));

// If connection is successful
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

module.exports = mongoose;
