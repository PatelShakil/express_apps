const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Middleware to check session
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

// View all categories
router.get("/", isAuthenticated, async (req, res) => {
  const categories = await Category.find();
  res.render("categories", { categories });
});

// Add category
router.post("/add", isAuthenticated, async (req, res) => {
  const { name } = req.body;
  await Category.create({ name });
  res.redirect("/categories");
});

// Delete category
router.get("/delete/:id", isAuthenticated, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/categories");
});

// Edit category page
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("editCategory", { category });
});

// Update category
router.post("/update/:id", isAuthenticated, async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
  res.redirect("/categories");
});

module.exports = router;
