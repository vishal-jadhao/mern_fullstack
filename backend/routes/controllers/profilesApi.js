const profilesApiController = {
  async test(req, res) {
    await res.json({ msg: "Users API works" });
  }
};

module.exports = profilesApiController;
