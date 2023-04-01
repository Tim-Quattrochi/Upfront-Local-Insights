const express = require("express");
const {
  getBusinessById,
} = require("../controllers/businessController");

const router = express.Router();

const {
  createReview,
  getAllReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/verifyJWT");
router.get("/", getAllReviews);

router.post("/:businessId", protect, createReview);

module.exports = router;
