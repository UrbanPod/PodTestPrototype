require('mongoose')

var User = require("../models/user").user;

module.exports = {
  
  testRoute: function(req, res) {
    console.log("I've reached the test route.");
    // console.log(req);
    res.status(200).json({});
  },

  saveProfile: function(req, res) {
    console.log(req.body);
    console.log("Route hit.");
    // console.log(req);

    var newUser = new User(req.body);
    newUser.save(function(err) {
      
      if (err) {
        console.log(err);
        res.status(500).send("Could not save user!");
        return;
      }

      res.status(200).send("Congratulations on creating your account!");
    });
  }
};
