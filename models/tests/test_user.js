var mockedUser = require("./mocks/user");

module.exports = function (models) {
  var User = models.user;
  it("User should have the correct fields", function (done) {
    User.create(mockedUser).then(function (result) {
      expect(result.public()).to.include.all.keys([
        "id",
        "name",
        "email",
        "gender",
        "about",
        "clean",
        "age",
        "noise",
        "interaction",
        "sleep"
      ]);
      done();
    });
  });

  it("User should require an email", function (done) {
    User.create({
      "name": mockedUser['name']
    }).then(function (result) {
      expect.fail();
      done();
    }).catch(function (err) {
      expect(err['name']).to.be.equal('SequelizeValidationError');
      done();
    });
  });

  it("User should require a name", function (done) {
    User.create({
      "email": mockedUser['email']
    }).then(function (result) {
      expect.fail();
      done();
    }).catch(function (err) {
      expect(err['name']).to.be.equal('SequelizeValidationError');
      done();
    });
  });
}
