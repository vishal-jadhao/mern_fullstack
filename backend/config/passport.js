const JwtStretegy = require("passport-jwt").Strategy;
const JwtExtreact = require("passport-jwt").ExtractJwt;

// Model to look for users
const mongoose = require("mongoose");
const User = require("../models/User");

// Keys or secret
const secretOrKey = require("../config/keys");

const opts = {};
opts.jwtFromRequest = JwtExtreact.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey.secret;

const passportJwt = passport => {
  passport.use(
    new JwtStretegy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};

module.exports = passportJwt;
