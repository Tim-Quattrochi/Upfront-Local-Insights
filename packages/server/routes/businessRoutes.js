const express = require("express");
const router = express.Router();

const {
  getGooglePlaces,
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessRating,
} = require("../controllers/businessController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", getAllBusinesses);
router.get("/places", getGooglePlaces);
router.get("/:businessId", getBusinessById);


router.post("/", createBusiness);
router.put("/:businessId", verifyJWT, updateBusinessRating);

module.exports = router;
