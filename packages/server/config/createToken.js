const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} = require("./constants");

const createAccessToken = (id, name, role) => {
  return jwt.sign({ id: id, name: name, role: role }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

const createRefreshToken = (id, name, role) => {
  return jwt.sign(
    { id: id, name: name, role: role },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_EXPIRES_IN,
    }
  );
};

module.exports = { createRefreshToken, createAccessToken };
