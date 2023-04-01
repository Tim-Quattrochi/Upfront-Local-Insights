const express = require("express");
const refresh = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/refresh", verifyJWT, refresh);

module.exports = router;
