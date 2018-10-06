const usersApiController = {
  async test(req, res) {
    await res.json({ msg: "Users API works" });
  }
};

module.exports = usersApiController;
