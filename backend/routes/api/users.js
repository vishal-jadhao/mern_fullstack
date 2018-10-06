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

/* @route POST api/users/register
 * @description register users route
 * @access public
 */
router.post("/register", usersApiController.register);

/* @route POST api/users/login
 * @description login users route
 * @access public
 */
router.post("/login", usersApiController.login);

module.exports = router;
