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
    res.status(200).json({});
  }

};
