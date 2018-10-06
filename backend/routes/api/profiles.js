const express = require("express");

// Router for HTTP
const router = express.Router();

// Profiles API controller
const profilesApiController = require("../controllers/profilesApi");

/* @route GET api/profiles/test
 * @description test profiles route
 * @access public
 */

router.get("/test", profilesApiController.test);

module.exports = router;
