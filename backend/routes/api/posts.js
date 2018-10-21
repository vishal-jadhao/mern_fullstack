const express = require("express");

// Router for HTTP
const router = express.Router();

// Posts API controller
const postsApiController = require("../controllers/postsApiCtrl");

/* @route GET api/posts/test
 * @description test posts route
 * @access public
 */

router.get("/test", postsApiController.test);

module.exports = router;
