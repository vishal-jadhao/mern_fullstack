const express = require("express");
const passport = require("passport");

// Router for HTTP
const router = express.Router();

// Profiles API controller
const profileApiController = require("../controllers/profileApiCtrl");

/* @route GET api/profile/test
 * @desc test profiles route
 * @access public
 */
router.get("/test", profileApiController.test);

/* @route GET api/profile
 * @desc get current user profile
 * @access private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileApiController.getProfile
);

/* @route GET api/profile/handle/:handle
 * @desc get profile by handle
 * @access public
 */
router.get("/handle/:handle", profileApiController.getProfileByHandle);

/* @route GET api/profile/handle/:user_id
 * @desc get profile by user ID
 * @access public
 */
router.get("/user/:user_id", profileApiController.getProfileById);

/* @route GET api/profile/all
 * @desc get all profiles
 * @access public
 */
router.get("/all", profileApiController.getAllProfile);

/* @route POST api/profile
 * @desc create profile for current user
 * @access private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileApiController.createProfile
);

/* @route POST api/profile/experience
 * @desc Add experience to profile
 * @access private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileApiController.addExperience
);

/* @route DELETE api/profile/experience
 * @desc Delete experience from profile
 * @access private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileApiController.deleteExperience
);

/* @route POST api/profile/education
 * @desc Add education to profile
 * @access private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileApiController.addEducation
);

/* @route DELETE api/profile/education
 * @desc Delete education from profile
 * @access private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  profileApiController.deleteEducation
);

/* @route DELETE api/profile
 * @desc Delete user and profile
 * @access private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileApiController.deleteUserProfile
);

module.exports = router;
