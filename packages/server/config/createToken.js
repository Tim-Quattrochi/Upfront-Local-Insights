const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

const createToken = (id, name, role) => {
  return jwt.sign({ id: id, name: name, role: role }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = createToken;
