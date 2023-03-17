const mongoose = require("mongoose");
const Business = require("../models/businessModel");

const getAllBusiness = async (req, res) => {
  try {
    let allBusiness = await Business.find({});

    res.status(200).json({ Businesses: allBusiness });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred while trying to fetch all businesses",
    });
  }
};

const createBusiness = async (req, res) => {
  const {
    name,
    description,
    selectedCategory,
    address,
    phone,
    email,
    website,
  } = req.body;

  console.log(req.body);

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
    return res
      .status(400)
      .json({
        error: "This business already exists in our database.",
      });
  }

  let newBusiness = await Business.create({
    name,
    description,
    category: selectedCategory,
    address,
    phone,
    email,
    website,
  });

  res.status(201).json(newBusiness);
};

module.exports = { createBusiness, getAllBusiness };
