const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/verifyJWT");
router.get("/", protect, getAllReviews);

router.post("/", createReview);

module.exports = router;
