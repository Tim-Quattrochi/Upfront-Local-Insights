const express = require("express");
const router = express.Router();
const protect = require("../middleware/verifyJWT");

const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessRating,
} = require("../controllers/businessController");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusinessById);

router.post("/", createBusiness);
router.put("/:businessId", updateBusinessRating);

module.exports = router;
