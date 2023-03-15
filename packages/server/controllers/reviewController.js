const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

const getAllReviews = async (req, res) => {
  let getReviews = await Review.find({});

  return res.status(200).json({ getReviews });
};

const createReview = async (req, res) => {
  const { comment, rating, user } = req.body;

  console.log(req.reqBody);

  const { businessId } = req.params;

  console.log(businessId);

  console.log(req.body);

  if (!comment || !rating) {
    return res
      .status(400)
      .json("Please fill out the required fields.");
  }

  let review = await Review.create({
    business: businessId,
    user,
    rating: rating,
    comment: comment,
  });

  return res.status(201).json(review);
};

module.exports = { createReview, getAllReviews };
