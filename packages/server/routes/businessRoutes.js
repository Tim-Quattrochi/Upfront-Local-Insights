const express = require("express");
const router = express.Router();
const protect = require("../middleware/verifyJWT");

const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
} = require("../controllers/businessController");

router.get("/", getAllBusinesses);
router.get("/:businessId", getBusinessById);

router.post("/", createBusiness);

module.exports = router;
