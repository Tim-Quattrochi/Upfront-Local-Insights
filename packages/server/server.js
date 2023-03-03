const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMyDB = require("./config/db");

const app = express();
const port = 3001;

connectMyDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/review", require("./routes/reviewRoutes"));
app.use("/business", require("./routes/businessRoutes"));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
