const mongoose = require("mongoose");
const Business = require("../models/businessModel");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

/* This is the multer configuration. It is telling multer where to store the file and what to name it. */
const storage = multer.diskStorage({
  destination: "./uploads/businessPhotos",
  filename: function (req, file, cb) {
    cb(
      null,
      "BUSINESS-PHOTO-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

/**
 * It fetches all businesses and populates the reviews and user fields
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate({
      path: "reviews",
      select: ["rating", "comment", "photo"],
      populate: {
        path: "user",
        select: "name",
      },
    });

    res.status(200).json({ businesses });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while trying to fetch all businesses",
    });
  }
};

/**
 * It finds a business by its id and populates the reviews and the user of the review
 * @param req - The request object.
 * @param res - The response object.
 * @returns The business with the id that was passed in the params.
 */
const getBusinessById = async (req, res) => {
  let { businessId } = req.params;

  try {
    const findBusiness = await Business.findOne({
      _id: businessId,
    }).populate({
      path: "reviews",
      select: ["user", "rating", "photo", "comment", "name"],
      populate: {
        path: "user",
        select: "name",
      },
    });

    if (!findBusiness) {
      return res.status(404).json({ Error: "Business not found." });
    } else {
      res.status(200).json(findBusiness);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error.name });
  }
};

/**
 * We're creating a new business and storing it in the database
 * @param req - the request object
 * @param res - the response object
 */
const createBusiness = async (req, res) => {
  try {
    //multer file upload
    upload(req, res, async (err) => {
      const {
        name,
        description,
        selectedCategory,
        address,
        phone,
        email,
        website,
        photo,
      } = req.body;

      if (
        !name ||
        !description ||
        !address ||
        !phone ||
        !website ||
        !selectedCategory
      ) {
        return res
          .status(400)
          .json("Please enter all the required fields.");
      }

      //if the business name exists, we don't want to store it

      const checkBusinessName = await Business.findOne({ name });

      if (checkBusinessName) {
        return res.status(400).json({
          error: "This business already exists in our database.",
        });
      } else {
        let newBusiness = await Business.create({
          name,
          description,
          category: selectedCategory,
          address,
          phone,
          email,
          website,
          photo: req.file ? req.file.path : "null",
        });
        res.status(201).json(newBusiness);
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

/**
 * It finds a business by its id, calculates the average rating of all its reviews, and updates the
 * business's rating with the new average
 * @param req - The request object.
 * @param res - The response object.
 * @returns The average rating of the business.
 */
const updateBusinessRating = async (req, res) => {
  const { businessId } = req.params;

  const business = await Business.findById(businessId).populate(
    "reviews"
  );

  if (!business) {
    return res.status(404).json({ error: "Business not found." });
  }

  const totalRatings = business.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const avgRating = totalRatings / business.reviews.length;

  business.rating = avgRating;
  await business.save();

  return res.status(200).json({ rating: business.rating });
};

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusinessRating,
};
