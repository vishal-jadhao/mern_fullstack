const postsApiController = {
  async test(req, res) {
    await res.json({ msg: "Users API works" });
  }
};

module.exports = postsApiController;
