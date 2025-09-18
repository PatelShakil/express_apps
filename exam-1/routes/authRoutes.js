const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Render Register Page
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Render Login Page
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Register User
router.post('/register', async (req, res) => {
    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email:req.email });
        if (existingUser) {
            return res.status(400).render('register', { error: "User already exists" });
        }

        req.body.password = await bcrypt.hash(req.body.password,10);

        const user = new User(req.body);
        await user.save();

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).render('register', { error: "Something went wrong" });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render('login', { error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('login', { error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secret", // use process.env.JWT_SECRET in production
            { expiresIn: "1d" }
        );

        // ✅ Option 1: Send JSON response (API style)
        // res.status(200).json({ user, token });

        // ✅ Option 2: Save token in session or cookie (for EJS frontend)
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/product");

    } catch (err) {
        console.error(err);
        res.status(500).render('login', { error: "Server error" });
    }
});
router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect('/login');
})


module.exports = router;
