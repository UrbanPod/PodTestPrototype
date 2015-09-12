var mockedUser = require("./mocks/user");

module.exports = function() {
  var User = require("../user");
  it("User should have the correct fields", function(done) {
    var user = new User.user(mockedUser);
    user.save(function (err, result) {
      if (err) done(err)
      var keys = ["name","email","about","values","mechanics"];
      keys.map(function(key) {
        expect(result[key]).to.exist;
      });
      done();
    });
  });
}
