const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const Business = require("../models/businessModel");
const User = require("../models/userModel");

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
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png .jpg and .jpeg pictures allowed.")
      );
    }
  },
}).single("file");

const createReview = async (req, res) => {
  const { businessId } = req.params;

  upload(req, res, async (err) => {
    //from multer cb aka call back regarding file types allowed.
    if (err) {
      return res.status(422).json({
        error:
          "only jpg, jpeg, and png picture allowed. Also only one picture per review at this time.",
      });
    }

    const { comment, user, rating, name } = req.body;
    //bring in the name of the user to reference.

    console.log(user);

    if (
      !rating ||
      rating === "0" ||
      rating === undefined ||
      rating === "undefined"
    ) {
      return res
        .status(400)
        .json({ error: "Please include a rating" });
    }

    try {
      if (err) {
        // handle errors
        console.error(err.message);
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

        //push the review id to the Business object.
        await Business.findByIdAndUpdate(
          businessId,
          { $push: { reviews: review._id } },
          { new: true }
        );

        //push the review id to the user object
        await User.findByIdAndUpdate(
          user,
          { $push: { reviews: review._id } },
          { new: true }
        );

        return res.status(201).json(review);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
};

const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const ownedReviews = await User.findById(userId)
    .populate({
      path: "reviews",
      populate: {
        path: "business",
        select: "name",
      },
    })

    .select("-password -refreshToken")
    .exec();
  res.status(200).json({ ownedReviews });
};

module.exports = { createReview, getAllReviews, getReviewsByUserId };
