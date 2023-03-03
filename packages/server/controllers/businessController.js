const mongoose = require("mongoose");
const Business = require("../models/businessModel");

const createBusiness = async (req, res) => {
  const {
    name,
    description,
    category,
    address,
    phone,
    email,
    website,
  } = req.body;

  if (
    !name ||
    !description ||
    !category ||
    !address ||
    !phone ||
    !email ||
    !website
  ) {
    return res
      .status(400)
      .json("Please enter all the required fields.");
  }

  let newBusiness = await Business.create({
    name,
    description,
    category,
    address,
    phone,
    email,
    website,
  });

  res.status(201).json(newBusiness);
};

module.exports = { createBusiness };
