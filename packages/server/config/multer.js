const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
