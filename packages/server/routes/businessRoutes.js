const express = require("express");
const router = express.Router();
const protect = require("../middleware/verifyJWT");

const {
  createBusiness,
  getAllBusinesses,
} = require("../controllers/businessController");

router.get("/", getAllBusinesses);

router.post("/", createBusiness);

module.exports = router;
