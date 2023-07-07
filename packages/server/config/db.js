const mongoose = require("mongoose");
const { DB_URI } = require("./constants");



const connectMyDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://pdt:pdtcap@cluster0.c0lidur.mongodb.net/Local-Insights?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMyDB;
