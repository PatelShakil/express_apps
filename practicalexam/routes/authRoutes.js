const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Show Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register User
router.post("/register", async (req, res) => {
  const { name, email, phone, gender, hobbies, field, password, confirmPassword } = req.body;
  // Basic validation
  if (!name || !email || !phone || !gender || !field || !password || !confirmPassword) {
    return res.send("All fields are required!");
  }
  if (password !== confirmPassword) return res.send("Passwords do not match!");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("User already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, phone, gender,
      hobbies: Array.isArray(hobbies) ? hobbies : [hobbies],
      field,
      password: hashedPassword
    });

    await newUser.save();
    res.render("success", { message: "Registration Successful!" });
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Show Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials!");

    // Create session
    req.session.user = user;
    res.redirect("/categories");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
