const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET } = require("../config/constants");
const {
  createAccessToken,
  createRefreshToken,
} = require("../config/createToken");
const User = require("../models/userModel");

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      console.log(decoded.id, user.id);
      if (err || user.id !== decoded.id) {
        return res.status(403).json({ message: "Forbidden." });
      }
      let accessToken = createAccessToken(
        user.id,
        user.name,
        user.email
      );

      res.json({ accessToken });
    }
  );
};

module.exports = refresh;
