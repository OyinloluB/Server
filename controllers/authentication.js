const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

// Take user ID and encode it with secret
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// sub means subject i.e who the token belongs to
// iat: issued at time

exports.signin = function (req, res, next) {
  // Give user token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  //  Check if email with user exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If user does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If user doesn't exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }
    });

    // Respond to request
    res.json({ token: tokenForUser(user) });
  });
};
