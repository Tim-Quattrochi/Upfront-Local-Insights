const express = require("express");
const {
  getBusinessById,
} = require("../controllers/businessController");

const router = express.Router();

const {
  createReview,
  getAllReviews,
  getReviewsByUserId,
} = require("../controllers/reviewController");

const protect = require("../middleware/verifyJWT");
router.get("/", getAllReviews);
router.get("/:userId", getReviewsByUserId);

router.post("/:businessId", protect, createReview);

module.exports = router;
