const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

module.exports = {
  DB_URI,
  JWT_SECRET,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  PORT,
};
