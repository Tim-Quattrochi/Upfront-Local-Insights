const express = require("express");
const refresh = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.route("/refresh").get(refresh);

module.exports = router;
