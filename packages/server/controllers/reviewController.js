const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const Business = require("../models/businessModel");

const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const getAllReviews = async (req, res) => {
  let getReviews = await Review.find({}).populate({
    path: "business",
    select: ["user", "rating", "photo", "comment", "name"],
  });

  return res.status(200).json({ getReviews });
};

// Multer Middle Ware
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      "REVIEW-PHOTO-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

const createReview = async (req, res) => {
  const { businessId } = req.params;

  upload(req, res, async (err) => {
    console.log(req.file);

    const { comment, user, rating, name } = req.body;
    //bring in the name of the user to reference.

    if (!rating) {
      return res.status(400).json("Please include a rating.");
    }
    if (err) {
      // handle errors
      console.error(err);
      return res.status(400).json({ error: err.message });
    } else {
      let review = await Review.create({
        business: businessId,
        user,
        name,
        rating: rating,
        comment: comment,
        photo: req.file?.path,
      });

      await Business.findByIdAndUpdate(
        businessId,
        { $push: { reviews: review._id } },
        { new: true }
      );

      return res.status(201).json(review);
    }
  });
};

module.exports = { createReview, getAllReviews };
