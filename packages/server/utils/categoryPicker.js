const categoriesPriority = [
  ["Restaurant", "cafe", "bar", "restaurant", "food"],
  ["Bar"],
  ["Cafe"],
  [
    "Retail",
    "department_store",
    "furniture_store",
    "home_goods_store",
    "clothing_store",
    "drugstore",
    "supermarket",
    "store",
    "meal_takeaway",
  ],
  ["Health", "health", "hospital"],
  ["Animal", "vet", "veterinarian", "pet_store"],
  [
    "Auto",
    "car_dealer",
    "automotive",
    "car_rental",
    "car_repair",
    "car_wash",
    "rv_park",
  ],
  ["Hardware", "hardware_store"],
  ["Gas Station", "gas_station"],
  ["Accounting", "accounting"],
  ["Airport", "airport"],
  ["Amusement Park", "amusement_park"],
  ["Aquarium", "aquarium"],
  ["Art Gallery", "art_gallery"],
  ["ATM", "atm"],
  ["Bakery", "bakery"],
  ["Bank", "bank"],
  ["Beauty Salon", "beauty_salon"],
  ["Bicycle Store", "bicycle_store"],
  ["Book Store", "book_store"],
  ["Bowling Alley", "bowling_alley"],
  ["Bus Station", "bus_station"],
  ["Campground", "campground"],
  ["Car Rental", "car_rental"],
  ["Car Wash", "car_wash"],
  ["Casino", "casino"],
  ["Cemetery", "cemetery"],
  ["Church", "church"],
  ["City Hall", "city_hall"],
  ["Convenience Store", "convenience_store"],
  ["Courthouse", "courthouse"],
  ["Dentist", "dentist"],
  ["Doctor", "doctor"],
  ["Electrician", "electrician"],
  ["Electronics Store", "electronics_store"],
  ["Embassy", "embassy"],
  ["Fire Station", "fire_station"],
  ["Florist", "florist"],
  ["Funeral Home", "funeral_home"],
  ["Gas Station", "gas_station"],
  ["Gym", "gym"],
  ["Hair Care", "hair_care"],
  ["Hardware Store", "hardware_store"],
  ["Hindu Temple", "hindu_temple"],
  ["Home Goods Store", "home_goods_store"],
  ["Hospital", "hospital"],
  ["Insurance Agency", "insurance_agency"],
  ["Jewelry Store", "jewelry_store"],
  ["Laundry", "laundry"],
  ["Lawyer", "lawyer"],
  ["Library", "library"],
  ["Light Rail Station", "light_rail_station"],
  ["Liquor Store", "liquor_store"],
  ["Local Government Office", "local_government_office"],
  ["Locksmith", "locksmith"],
  ["Lodging", "lodging"],
  ["Meal Delivery", "meal_delivery"],
  ["Meal Takeaway", "meal_takeaway"],
  ["Mosque", "mosque"],
  ["Movie Rental", "movie_rental"],
  ["Movie Theater", "movie_theater"],
  ["Moving Company", "moving_company"],
  ["Museum", "museum"],
  ["Night Club", "night_club"],
  ["Painter", "painter"],
  ["Park", "park"],
  ["Parking", "parking"],
  ["Pet Store", "pet_store"],
  ["Pharmacy", "pharmacy"],
  ["Physiotherapist", "physiotherapist"],
  ["Plumber", "plumber"],
  ["Police", "police"],
  ["Post Office", "post_office"],
  ["Primary School", "primary_school"],
  ["Real Estate Agency", "real_estate_agency"],
  ["Restaurant", "restaurant"],
  ["Roofing Contractor", "roofing_contractor"],
  ["RV Park", "rv_park"],
  ["School", "school"],
  ["Secondary School", "secondary_school"],
  ["Shoe Store", "shoe_store"],
  ["Shopping Mall", "shopping_mall"],
  ["Spa", "spa"],
  ["Stadium", "stadium"],
  ["Storage", "storage"],
  ["Store", "store"],
  ["Subway Station", "subway_station"],
  ["Supermarket", "supermarket"],
  ["Synagogue", "synagogue"],
  ["Taxi Stand", "taxi_stand"],
  ["Tourist Attraction", "tourist_attraction"],
  ["Train Station", "train_station"],
  ["Transit Station", "transit_station"],
  ["Travel Agency", "travel_agency"],
  ["University", "university"],
  ["Veterinary Care", "veterinary_care"],
  ["Zoo", "zoo"],
];

const mapGooglePlaceTypesToCustomCategory = (types) => {
  for (const categoryPriority of categoriesPriority) {
    for (const type of types) {
      if (categoryPriority.includes(type)) {
        return categoryPriority[0];
      }
    }
  }

  return "Other";
};

module.exports = mapGooglePlaceTypesToCustomCategory;
