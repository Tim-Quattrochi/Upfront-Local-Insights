const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectMyDB = require("./config/db");
const { login } = require("./controllers/userController");

const app = express();

const port = 3001;

connectMyDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/review", require("./routes/reviewRoutes"));
app.use("/business", require("./routes/businessRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
