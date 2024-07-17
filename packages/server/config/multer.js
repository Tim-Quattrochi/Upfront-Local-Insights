const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const fileFilter = (req, file, cb) => {
  const allowedMimeType = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "images/webp",
  ];
  if (allowedMimeType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg .png .jpg images allowed."), false);
  }
};

/* This is the multer configuration. It is telling multer where to store the file and what to name it. */
const storage = multer.diskStorage({
  destination: "./uploads/businessPhotos",
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${Date.now()}- ${
      file.originalname
    }`;
    cb(null, "BUSINESS-PHOTO-" + uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single("file");

module.exports = upload;
