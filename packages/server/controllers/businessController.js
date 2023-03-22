const mongoose = require("mongoose");
const Business = require("../models/businessModel");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

// Multer Middle Ware
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

const getBusinessById = async (req, res) => {
  let { businessId } = req.params;

  try {
    const findBusiness = await Business.findOne({ _id: businessId });

    if (!findBusiness) {
      return res.status(404).json({ Error: "Business not found." });
    } else {
      res.status(200).json({ business: findBusiness });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Something went wrong.." });
  }
};

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

module.exports = {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
};
