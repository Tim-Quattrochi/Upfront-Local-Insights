const express = require("express");
const router = express.Router();

router.use("/review", require("./reviewRoutes"));
router.use("/business", require("./businessRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/health", async (_, res) => {
  return res.sendStatus(200);
});

module.exports = { router };
