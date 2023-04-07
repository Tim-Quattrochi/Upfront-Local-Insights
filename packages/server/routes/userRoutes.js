const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  getAllUsers,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", signUp);

router.get("/register", getAllUsers);

module.exports = router;
