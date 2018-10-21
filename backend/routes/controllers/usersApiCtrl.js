const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const keys = require("../../config/keys");

// Register input validator
const validateRegisterInput = require("../validation/register");

// Login input validator
const validateLoginInput = require("../validation/login");

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
    try {
      const { errors, isValid } = validateRegisterInput(req.body);
      // Check validation with validator
      if (!isValid) {
        return res.status(400).json(errors);
      } else {
        await User.findOne({ email: req.body.email }).then(user => {
          if (user) {
            errors.email = "Email already exists";
            res.status(400).json(errors);
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
                  .catch(err => res.json(err));
              });
            });
          }
        });
      }
    } catch (err) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Callback for login api
   * Validate user and return JWT
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    try {
      const { errors, isValid } = validateLoginInput(req.body);
      // Check validation with validator

      if (!isValid) {
        return res.status(400).json(errors);
      } else {
        const email = req.body.email;
        const password = req.body.password;
        // Find user by email
        await User.findOne({ email }).then(user => {
          // Check for user
          if (!user) {
            errors.email = "User not found";
            res.status(404).json(errors);
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
              jwt.sign(
                payload,
                keys.secret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    sucess: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              errors.password = "password incorrect";
              res.status(400).json(errors);
            }
          });
        });
      }
    } catch (err) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   */
  async getCurrentUser(req, res) {
    try {
      await res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      });
    } catch (err) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  }
};

module.exports = usersApiController;
