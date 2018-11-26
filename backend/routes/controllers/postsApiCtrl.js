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
   * Function to like the post
   *
   * @param {*} req
   * @param {*} res
   */
  async likePost(req, res) {
    try {
      await Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User already liked the post" });
          }
          // Add user to likes array
          post.likes.unshift({ user: req.user.id });
          // Save the post
          post.save().then(post => {
            res.status(200).json(post);
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
   * Function to unlike the post
   *
   * @param {*} req
   * @param {*} res
   */
  async unLikePost(req, res) {
    try {
      await Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not liked this post yet" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice the array with index
          post.likes.splice(removeIndex, 1);

          // Save the post
          post.save().then(post => {
            res.status(200).json(post);
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
   * Function to add comment to post
   *
   * @param {*} req
   * @param {*} res
   */
  async addComment(req, res) {
    try {
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      }
      await Post.findById(req.params.post_id).then(post => {
        const comment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // Add to comments array
        post.comments.unshift(comment);

        // Save post
        post
          .save()
          .then(post => {
            res.status(200).json(post);
          })
          .catch(err => {
            res.status(404).json({ postNotFound: "post not found" });
          });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Function to delete comment
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteComment(req, res) {
    try {
      await Post.findById(req.params.post_id).then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotExists: "Comment does not exists" });
        }

        // Get Remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice it from array using remove index
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.status(200).json(post));
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  }
};

module.exports = postsApiController;
