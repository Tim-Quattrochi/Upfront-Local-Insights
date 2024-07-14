const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectMyDB = require("./config/db");
const { PORT, NODE_ENV } = require("./config/constants");
const { router } = require("./routes/index");

const app = express();

connectMyDB();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://upfront-local-client.onrender.com",
      "https://upfront-local-insights-client.vercel.app",
      "https://upfront-local-insights-clien-git-0ecaa1-timquattrochis-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

//routes

app.use("/api", router);

if (NODE_ENV === "production") {
  app.use("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "../client/dist/index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
