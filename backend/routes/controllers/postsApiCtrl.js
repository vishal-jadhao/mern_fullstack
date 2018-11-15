// Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Validate post input
const validatePostInput = require("../validation/post");

const postsApiController = {
  /**
   *
   *
   * @param {*} req
   * @param {*} res
   */
  async test(req, res) {
    await res.json({ msg: "Users API works" });
  },

  /**
   * Function to get all posts
   *
   * @param {*} req
   * @param {*} res
   */
  async getAllPosts(req, res) {
    try {
      await Post.find()
        .sort({ date: -1 })
        .then(posts => {
          res.status(200).json(posts);
        });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Function to get single post
   *
   * @param {*} req
   * @param {*} res
   */
  async getSinglePost(req, res) {
    try {
      await Post.findById(req.params.post_id).then(post => {
        res.status(200).json(post);
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Function to delete single post
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteSinglePost(req, res) {
    try {
      await Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id).then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unAuthorized: "User not authorized" });
          }
          // delete
          post.remove().then(() => {
            res.status(200).json({ sucess: true });
          });
        });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Function to create new posts
   *
   * @param {*} req
   * @param {*} res
   */
  async createPosts(req, res) {
    try {
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      }
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
      await newPost.save().then(post => {
        res.status(200).json(post);
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  }
};

module.exports = postsApiController;
