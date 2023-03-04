const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const createToken = require("../config/createToken");

const signUp = async (req, res) => {
  const { confirmPassword, name, password, email } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json("Please enter all the required fields.");
  }
  if (password !== confirmPassword) {
    res.status(422).json("Passwords must match.");
  }

  const checkExistingUser = await User.findOne(email);

  if (checkExistingUser) {
    return res
      .status(400)
      .json("User already exists with that information.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    token: createToken(newUser.id),
  });

  if (newUser) {
    return res.status(201).json({ newUser });
  } else {
    return res
      .status(400)
      .json("Something went wrong... Try again later.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const checkExistingUser = await User.findOne({ email });

  if (!checkExistingUser) {
    return res.status(404).json("User not found.");
  }

  if (
    checkExistingUser &&
    (await bcrypt.compare(password, checkExistingUser.password))
  ) {
    return res.status(200).json({
      id: checkExistingUser.id,
      name: checkExistingUser.name,
      email: checkExistingUser.email,
      token: createToken(checkExistingUser.id),
    });
  } else {
    return res.status(401).json("Invalid login information.");
  }
};

module.exports = {
  signUp,
  login,
};
