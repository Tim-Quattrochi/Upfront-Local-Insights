const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = createToken;
