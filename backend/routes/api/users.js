const express = require("express");

// Router for HTTP
const router = express.Router();

// Users API controller
const usersApiController = require("../controllers/usersApi");

/* @route GET api/users/test
 * @description test users route
 * @access public
 */

router.get("/test", usersApiController.test);

module.exports = router;
