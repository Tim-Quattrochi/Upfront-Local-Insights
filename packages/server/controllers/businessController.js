const mongoose = require("mongoose");
const Business = require("../models/businessModel");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const axios = require("axios");
const mapGooglePlaceTypesToCustomCategory = require("../utils/categoryPicker");

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

// Function to get place details using the place_id
// const getPlaceDetails = async (placeId) => {
//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
//     );

//     const placeDetails = response.data.result;

//     // Access photos array
//     const photos = placeDetails?.photos || [];

//     // Get the first photo reference (if available)
//     let photo = null;
//     if (photos.length > 0) {
//       const photoReference = photos[0].photo_reference;
//       // Construct the photo URL
//       const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
//       photo = photoUrl;
//     }

//     const customCategory = mapGooglePlaceTypesToCustomCategory(
//       placeDetails?.types || []
//     );

//     const phoneNumber = placeDetails?.formatted_phone_number;
//     const address = placeDetails?.formatted_address;
//     const website = placeDetails?.website;

//     const constructedBusiness = {
//       name: placeDetails?.name,
//       category: customCategory,
//       address: address,
//       phone: phoneNumber,
//       website: website,
//       photo: photo,
//     };

//     try {
//       const checkBusinessName = await Business.findOne({
//         name: constructedBusiness.name,
//       });

//       if (checkBusinessName) {
//         throw new Error(
//           "This business already exists in our database."
//         );
//       }

//       const newBusiness = await Business.create(constructedBusiness);
//       console.log("New business created:", newBusiness);
//     } catch (err) {
//       throw err;
//     }

//     return constructedBusiness;
//   } catch (error) {
//     console.log("Error fetching place details:", error);
//     throw new Error(error);
//   }
// };
const getPlaceDetails = async (placeIds) => {
  try {
    const placeDetailsPromises = [];
    for (const placeId of placeIds) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
      );

      const placeDetails = response.data.result;

      // Access photos array
      const photos = placeDetails?.photos || [];

      // Get the first photo reference (if available)
      let photo = null;
      if (photos.length > 0) {
        const photoReference = photos[0].photo_reference;
        // Construct the photo URL
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
        photo = photoUrl;
      }

      const customCategory = mapGooglePlaceTypesToCustomCategory(
        placeDetails?.types || []
      );

      const phoneNumber =
        placeDetails?.formatted_phone_number || null;
      const address = placeDetails?.formatted_address || null;
      const name = placeDetails?.name || null;

      if (!name || !address || !phoneNumber) {
        console.log("Skipping place - missing required fields:");
        continue;
      }

      const constructedBusiness = {
        name: name,
        category: customCategory,
        address: address,
        phone: phoneNumber,
        website: placeDetails?.website || null,
        photo: photo,
      };

      try {
        const checkBusinessName = await Business.findOne({
          name: constructedBusiness.name,
        });

        if (checkBusinessName) {
          console.log("Skipping place - already exists:");
          continue;
        }

        const newBusiness = await Business.create(
          constructedBusiness
        );
        console.log("New business created:", newBusiness);
        placeDetailsPromises.push(constructedBusiness);
      } catch (err) {
        // Handle database-related errors, e.g., duplicate business name
        console.error("Error saving to the database:", err);
        continue;
      }
    }

    return placeDetailsPromises;
  } catch (error) {
    console.log("Error fetching place details:", error);
    throw new Error("Failed to fetch place details.");
  }
};

const getGooglePlaces = async (req, res) => {
  try {
    const { keyword, type } = req.query;

    const {
      data: { results },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.8105,-81.8775&radius=5000&type=${type}&keyword=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const placeIds = results.map((place) => place.place_id);

    if (placeIds.length === 0) {
      return res.status(404).json({ error: "No Businesses found." });
    }

    const lastPlaceId = placeIds[placeIds.length - 1];

    const placeDetails = await getPlaceDetails(placeIds);

    res.status(200).json(results);
  } catch (error) {
    if (
      error.message ===
      "Error: This business already exists in our database."
    ) {
      return res.status(400).json({
        error: "This business already exists in our database.",
      });
    }

    res.status(500).json({ error: "Failed to get any businesses." });
  }
};

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
      select: [
        "user",
        "rating",
        "photo",
        "comment",
        "name",
        "createdAt",
      ],
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
      if (err) {
        return res.status(422).json({
          error:
            "only jpg, jpeg, and png picture allowed. Also only one picture per review at this time.",
        });
      }

      const {
        name,
        description,
        selectedCategory,
        address,
        phone,
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
          .json({ error: "Please enter all the required fields." });
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
  getGooglePlaces,
};
