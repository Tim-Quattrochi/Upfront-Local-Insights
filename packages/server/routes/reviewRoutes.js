const express = require("express");
const router = express.Router();

const { createReview } = require("../controllers/reviewController");

const protect = require("../middleware/verifyJWT");

router.post("/", protect, createReview);

module.exports = router;
