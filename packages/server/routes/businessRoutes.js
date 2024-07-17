const express = require("express");
const multer = require("../config/multer");
const router = express.Router();
const {
  getGooglePlaces,
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessRating,
} = require("../controllers/businessController");
const verifyJWT = require("../middleware/verifyJWT");
const isAdmin = require("../middleware/authMiddleware");

router.get("/", getAllBusinesses);
router.get("/places", verifyJWT, isAdmin, getGooglePlaces);
router.get("/:businessId", getBusinessById);

router.post("/", multer, createBusiness);
router.put("/:businessId", verifyJWT, updateBusinessRating);

module.exports = router;
