const express = require("express");
const router = express.Router();
const protect = require("../middleware/verifyJWT");

const {
  createBusiness,
  getAllBusiness,
} = require("../controllers/businessController");

router.get("/", protect, getAllBusiness);

router.post("/", protect, createBusiness);

module.exports = router;
