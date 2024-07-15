const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");

const verifyJWT = async (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Forbidden." }); // This is not a valid token.
      }

      req.user = {
        name: decoded.name,
        id: decoded.id,
        role: decoded.role,
      };

      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = verifyJWT;
