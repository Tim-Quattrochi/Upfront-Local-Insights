const passport = require("passport");
const PassportLocal = require("passport-local");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const localStrategy = () => {
  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const checkExistingUser = await User.findOne(email);

          if (
            checkExistingUser &&
            (await bcrypt.compare(
              password,
              checkExistingUser.password
            ))
          ) {
            return done(null, checkExistingUser);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = localStrategy;
