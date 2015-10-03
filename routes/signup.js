var express = require("express");
var handler = require("./utils/response");

module.exports = function (models) {
  var router = express.Router();
  var User = models.user;

  router.post('/', function (req, res) {
    console.log("here");
    User.build({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      about: req.body.interests,
      clean: req.body.clean,
      age: req.body.age,
      noise: req.body.noise,
      interaction: req.body.interaction,
      sleep: req.body.sleep
    }).save().then(function (user) {
      console.log(user);
      if (user) {
        handler.success(res, { "id": user.id });
      } else {
        handler.error("something went wrong.");
      }
    }).catch(function(err) {
      console.log(err);
      handler.error(err);
    })
  });

  return router;
};
