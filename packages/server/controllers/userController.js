const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
} = require("../config/createToken");

const signUp = async (req, res) => {
  const { confirmPassword, name, password, email, role } = req.body;

  console.log(confirmPassword, name, password, email);

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json("Please enter all the required fields.");
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ error: "Passwords must match." });
  }

  try {
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.status(400).json({
        error: "User already exists with that information.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    //Send back user details to the client, minus the password.
    let user = await User.findById({
      _id: newUser._id,
    }).select("-password");

    //create access token
    let accessToken = createAccessToken(
      newUser._id,
      newUser.name,
      newUser.role
    );

    if (newUser) {
      return res.status(201).json({ user, accessToken: accessToken });
    } else {
      return res
        .status(400)
        .json("Something went wrong... Try again later.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter the required fields." });
  }

  try {
    const checkExistingUser = await User.findOne({ email });

    if (!checkExistingUser) {
      return res.status(404).json("User not found.");
    }

    if (
      checkExistingUser &&
      (await bcrypt.compare(password, checkExistingUser.password))
    ) {
      let refreshToken = createRefreshToken(
        checkExistingUser.id,
        checkExistingUser.name,
        checkExistingUser.role
      );

      //Send back user details to the client, minus the password.
      let user = await User.findById({
        _id: checkExistingUser._id,
      }).select("-password -refreshToken"); //don't send the client the PW || refreshToken.

      //save the refresh token in the db.
      checkExistingUser.refreshToken = refreshToken;
      await checkExistingUser.save();

      //create http only cookie containing the refresh token.
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });

      res.status(200).json({
        user,
        accessToken: createAccessToken(
          checkExistingUser.id,
          checkExistingUser.name,
          checkExistingUser.role
        ),
      });
    } else {
      return res.status(401).json("Invalid login information.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong.");
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("reviews");

  res.status(200).json({ users });
};

module.exports = {
  signUp,
  login,
  getAllUsers,
};
