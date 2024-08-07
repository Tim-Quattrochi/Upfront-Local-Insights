const categoriesPriority = [
  { category: "Gas Station", types: ["gas_station"] },
  { category: "Convenience Store", types: ["convenience_store"] },
  { category: "ATM", types: ["atm"] },
  { category: "Car Wash", types: ["car_wash"] },
  { category: "Cafe", types: ["cafe"] },
  {
    category: "Restaurant",
    types: ["restaurant", "food", "meal_takeaway"],
  },
  {
    category: "Retail",
    types: [
      "store",
      "department_store",
      "furniture_store",
      "home_goods_store",
      "clothing_store",
      "drugstore",
      "supermarket",
    ],
  },
  { category: "Health", types: ["health", "hospital"] },
  { category: "Animal", types: ["vet", "veterinarian", "pet_store"] },
  {
    category: "Auto",
    types: [
      "car_dealer",
      "automotive",
      "car_rental",
      "car_repair",
      "car_wash",
      "rv_park",
    ],
  },
  { category: "Hardware", types: ["hardware_store"] },
  { category: "Accounting", types: ["accounting"] },
  { category: "Airport", types: ["airport"] },
  { category: "Amusement Park", types: ["amusement_park"] },
  { category: "Aquarium", types: ["aquarium"] },
  { category: "Art Gallery", types: ["art_gallery"] },
  { category: "Bakery", types: ["bakery"] },
  { category: "Bank", types: ["bank"] },
  { category: "Bar", types: ["bar"] },
  { category: "Beauty Salon", types: ["beauty_salon"] },
  { category: "Bicycle Store", types: ["bicycle_store"] },
  { category: "Book Store", types: ["book_store"] },
  { category: "Bowling Alley", types: ["bowling_alley"] },
  { category: "Bus Station", types: ["bus_station"] },
  { category: "Campground", types: ["campground"] },
  { category: "Casino", types: ["casino"] },
  { category: "Cemetery", types: ["cemetery"] },
  { category: "Church", types: ["church"] },
  { category: "City Hall", types: ["city_hall"] },
  { category: "Courthouse", types: ["courthouse"] },
  { category: "Dentist", types: ["dentist"] },
  { category: "Doctor", types: ["doctor"] },
  { category: "Electrician", types: ["electrician"] },
  { category: "Electronics Store", types: ["electronics_store"] },
  { category: "Embassy", types: ["embassy"] },
  { category: "Fire Station", types: ["fire_station"] },
  { category: "Florist", types: ["florist"] },
  { category: "Funeral Home", types: ["funeral_home"] },
  { category: "Gym", types: ["gym"] },
  { category: "Hair Care", types: ["hair_care"] },
  { category: "Hindu Temple", types: ["hindu_temple"] },
  { category: "Home Goods Store", types: ["home_goods_store"] },
  { category: "Hospital", types: ["hospital"] },
  { category: "Insurance Agency", types: ["insurance_agency"] },
  { category: "Jewelry Store", types: ["jewelry_store"] },
  { category: "Laundry", types: ["laundry"] },
  { category: "Lawyer", types: ["lawyer"] },
  { category: "Library", types: ["library"] },
  { category: "Light Rail Station", types: ["light_rail_station"] },
  { category: "Liquor Store", types: ["liquor_store"] },
  {
    category: "Local Government Office",
    types: ["local_government_office"],
  },
  { category: "Locksmith", types: ["locksmith"] },
  { category: "Lodging", types: ["lodging"] },
  { category: "Meal Delivery", types: ["meal_delivery"] },
  { category: "Mosque", types: ["mosque"] },
  { category: "Movie Rental", types: ["movie_rental"] },
  { category: "Movie Theater", types: ["movie_theater"] },
  { category: "Moving Company", types: ["moving_company"] },
  { category: "Museum", types: ["museum"] },
  { category: "Night Club", types: ["night_club"] },
  { category: "Painter", types: ["painter"] },
  { category: "Park", types: ["park"] },
  { category: "Parking", types: ["parking"] },
  { category: "Pet Store", types: ["pet_store"] },
  { category: "Pharmacy", types: ["pharmacy"] },
  { category: "Physiotherapist", types: ["physiotherapist"] },
  { category: "Plumber", types: ["plumber"] },
  { category: "Police", types: ["police"] },
  { category: "Post Office", types: ["post_office"] },
  { category: "Primary School", types: ["primary_school"] },
  { category: "Real Estate Agency", types: ["real_estate_agency"] },
  { category: "Roofing Contractor", types: ["roofing_contractor"] },
  { category: "RV Park", types: ["rv_park"] },
  { category: "School", types: ["school"] },
  { category: "Secondary School", types: ["secondary_school"] },
  { category: "Shoe Store", types: ["shoe_store"] },
  { category: "Shopping Mall", types: ["shopping_mall"] },
  { category: "Spa", types: ["spa"] },
  { category: "Stadium", types: ["stadium"] },
  { category: "Storage", types: ["storage"] },
  { category: "Subway Station", types: ["subway_station"] },
  { category: "Supermarket", types: ["supermarket"] },
  { category: "Synagogue", types: ["synagogue"] },
  { category: "Taxi Stand", types: ["taxi_stand"] },
  { category: "Tourist Attraction", types: ["tourist_attraction"] },
  { category: "Train Station", types: ["train_station"] },
  { category: "Transit Station", types: ["transit_station"] },
  { category: "Travel Agency", types: ["travel_agency"] },
  { category: "University", types: ["university"] },
  { category: "Veterinary Care", types: ["veterinary_care"] },
  { category: "Zoo", types: ["zoo"] },
];

const mapGooglePlaceTypesToCustomCategory = (types) => {
  for (const {
    category,
    types: categoryTypes,
  } of categoriesPriority) {
    for (const type of types) {
      if (categoryTypes.includes(type)) {
        return category;
      }
    }
  }

  return "Other";
};
module.exports = mapGooglePlaceTypesToCustomCategory;
