const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup (IN MEMORY ONLY)
app.use(session({
  secret: "secretKey123",  // keep secret in .env in real apps
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// DB connection
// connectDB();

// Routes
app.use("/", authRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
