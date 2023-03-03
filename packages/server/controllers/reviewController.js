const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

const createReview = async (req, res) => {
  const { business, user, rating, comment } = req.body;

  console.log(business);

  if (!business || !rating || !comment) {
    return res
      .status(400)
      .json("Please fill out the required fields.");
  }

  let review = await Review.create({
    business: business,
    rating: rating,
    comment: comment,
  });

  return res.status(401).json(review);
};

module.exports = { createReview };
