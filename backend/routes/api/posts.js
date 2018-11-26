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

/* @route POST api/posts/
 * @desc Create posts
 * @access private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsApiController.createPosts
);

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

/* @route POST api/posts/like/:id
 * @desc Like the post
 * @access private
 */
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  postsApiController.likePost
);

/* @route POST api/posts/unlike/:id
 * @desc Unlike the post
 * @access private
 */
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  postsApiController.unLikePost
);

/* @route POST api/posts/comment/:id
 * @desc Add comment to post
 * @access private
 */
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  postsApiController.addComment
);

/* @route DELETE api/posts/comment/:id
 * @desc Delete comment from post
 * @access private
 */
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postsApiController.deleteComment
);

module.exports = router;
