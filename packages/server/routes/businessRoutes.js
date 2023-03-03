const express = require("express");
const router = express.Router();

const {
  createBusiness,
} = require("../controllers/businessController");

router.post("/", createBusiness);

module.exports = router;
