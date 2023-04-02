const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Restaurant",
      "Bar",
      "Cafe",
      "Retail",
      "Salon",
      "Animal",
      "Auto",
      "Hardware",
      "Gas Station",
      "Other",
    ],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },

  website: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
