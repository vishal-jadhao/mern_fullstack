const express = require("express");
const passport = require("passport");

// Router for HTTP
const router = express.Router();

// Users API controller
const usersApiController = require("../controllers/usersApiCtrl");

/* @route GET api/users/test
 * @desc test users route
 * @access public
 */
router.get("/test", usersApiController.test);

/* @route POST api/users/register
 * @desc register users route
 * @access public
 */
router.post("/register", usersApiController.register);

/* @route POST api/users/login
 * @desc login users route
 * @access public
 */
router.post("/login", usersApiController.login);

/* @route GET api/users/current
 * @desc returns current user w.r.t JWT
 * @access private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  usersApiController.getCurrentUser
);

module.exports = router;
