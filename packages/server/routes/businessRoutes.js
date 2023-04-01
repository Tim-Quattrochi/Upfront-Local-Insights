const express = require("express");
const router = express.Router();

const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessRating,
} = require("../controllers/businessController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusinessById);

router.post("/", createBusiness);
router.put("/:businessId", verifyJWT, updateBusinessRating);

module.exports = router;
