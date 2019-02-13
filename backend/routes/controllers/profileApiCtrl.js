// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// Profile input validator
const validateProfileInput = require("../validation/profile");

// Validate experience input
const validateExperienceInput = require("../validation/experience");

// Validate education input
const validateEducationInput = require("../validation/education");

const profileApiController = {
  /**
   * Test route controller
   *
   * @param {*} req
   * @param {*} res
   */
  async test(req, res) {
    await res.status(200).json({ msg: "Users API works" });
  },

  /**
   * Get the logged in user profile
   *
   * @param {*} req
   * @param {*} res
   */
  async getProfile(req, res) {
    try {
      const errors = {};
      await Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noProfile = "There is no profile for this user";
            return res.status(400).json(errors);
          }
          res.status(200).json(profile);
        });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Get the profile by handle
   *
   * @param {*} req
   * @param {*} res
   */
  async getProfileByHandle(req, res) {
    try {
      const errors = {};
      await Profile.findOne({ handle: req.params.handle })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noProfile = "There is no profile for this handle";
            return res.status(400).json(errors);
          }
          res.status(200).json(profile);
        });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * Get the profile by ID
   *
   * @param {*} req
   * @param {*} res
   */
  async getProfileById(req, res) {
    try {
      const errors = {};
      await Profile.findOne({ user: req.params.user_id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noProfile = "There is no profile for this id";
            return res.status(400).json(errors);
          }
          res.status(200).json(profile);
        });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * To get all profiles
   *
   * @param {*} req
   * @param {*} res
   */
  async getAllProfile(req, res) {
    try {
      const errors = {};
      await Profile.find()
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noProfile = "There are no profiles";
            return res.status(400).json(errors);
          }
          res.status(200).json(profile);
        });
    } catch (error) {
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
  async createProfile(req, res) {
    console.log(req.user.id);
    try {
      const { errors, isValid } = validateProfileInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      // Profile fields;
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;

      // Skills - split into array
      if (typeof (req.body.skills !== undefined)) {
        profileFields.skills = req.body.skills.split(",");
      }

      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.handle) profileFields.handle = req.body.handle;

      await Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Update profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
            res.status(200).json(profile);
          });
        } else {
          // Create new profile
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "Handle already exists";
              return res.status(400).json(errors);
            }
            // Save profile
            const newProfile = new Profile(profileFields);
            newProfile.save().then(profile => {
              res.status(200).json(profile);
            });
          });
        }
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * To add experience details to profile
   *
   * @param {*} req
   * @param {*} res
   */
  async addExperience(req, res) {
    try {
      const { errors, isValid } = validateExperienceInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      await Profile.findOne({ user: req.user.id }).then(profile => {
        const newExperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        // Add experience array
        profile.experience.unshift(newExperience);
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      });
    } catch (error) {
      res.status(403).json({
        error: error
      });
    }
  },

  /**
   * To delete experience details from profile
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteExperience(req, res) {
    try {
      await Profile.findOne({ user: req.user.id }).then(profile => {
        // get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * To add education details to profile
   *
   * @param {*} req
   * @param {*} res
   */
  async addEducation(req, res) {
    try {
      const { errors, isValid } = validateEducationInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      await Profile.findOne({ user: req.user.id }).then(profile => {
        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        // Add education array
        profile.education.unshift(newEducation);
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * To delete education details from profile
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteEducation(req, res) {
    try {
      await Profile.findOne({ user: req.user.id }).then(profile => {
        // get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  },

  /**
   * To delete user and profile
   *
   * @param {*} req
   * @param {*} res
   */
  async deleteUserProfile(req, res) {
    try {
      await Profile.findOneAndRemove({ user: req.user.id }).then(profile => {
        User.findOneAndRemove({ _id: req.user.id }).then(user => {
          res.status(200).json({ sucess: true });
        });
      });
    } catch (error) {
      res.status(403).send({
        error: "Something went wrong please try again!"
      });
    }
  }
};

module.exports = profileApiController;
