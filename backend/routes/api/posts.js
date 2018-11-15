const express = require("express");
const passport = require("passport");

// Router for HTTP
const router = express.Router();

// Posts API controller
const postsApiController = require("../controllers/postsApiCtrl");

/* @route GET api/posts/test
 * @desc test posts route
 * @access public
 */
router.get("/test", postsApiController.test);

/* @route GET api/posts/
 * @desc Get all posts
 * @access public
 */
router.get("/", postsApiController.getAllPosts);

/* @route GET api/posts/:id
 * @desc Get all posts
 * @access public
 */
router.get("/:post_id", postsApiController.getSinglePost);

/* @route DELETE api/posts/:id
 * @desc Delete the post
 * @access private
 */
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  postsApiController.deleteSinglePost
);

/* @route POST api/posts/
 * @desc Create posts
 * @access private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsApiController.createPosts
);

module.exports = router;
