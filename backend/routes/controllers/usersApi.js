const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const usersApiController = {
  /**
   * To test the test route with user
   *
   * @param {*} req
   * @param {*} res
   */
  async test(req, res) {
    await res.json({ msg: "Users API works" });
  },

  /**
   * Callback to register api
   * Save user to database with encrypted password
   * @param {*} req
   * @param {*} res
   */
  async register(req, res) {
    await User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.status(400).json({ err: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          size: "200",
          rating: "pg",
          default: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar || avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  /**
   * Callback for login api
   * Validate user and return JWT
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    await User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        res.status(404).json({ err: "User not found" });
      }
      // Check for password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          // Create jwt payload
          const payload = {
            id: user._id,
            name: user.name,
            avatar: user.avatar
          };
          // sign token
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          });
        } else {
          res.status(400).json({ err: "password incorrect" });
        }
      });
    });
  }
};

module.exports = usersApiController;
