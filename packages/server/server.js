const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectMyDB = require("./config/db");
const { NODE_ENV, PORT } = require("./config/constants");

const app = express();

connectMyDB();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://upfront-local-client.onrender.com",
      "https://upfront-local-insights-client.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/business", require("./routes/businessRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use(
    express.static(path.join(__dirname, "./uploads/businessPhotos"))
  );
  app.use(express.static(path.join(__dirname, "./uploads")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/dist/index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
