var mockedInterest = require("./mocks/interest");

module.exports = function (models) {
  var Interest = models.interest;
  it("Interest should have the correct fields", function (done) {
    Interest.create(mockedInterest).then(function (result) {
      expect(result.pack()).to.include.all.keys(
        ["id", "name"]
      );
      done();
    })
  });

  it("Interest should require a name", function (done) {
    Interest.create({}).then(function (result) {
      expect.fail();
      done();
    }).catch(function (err) {
      expect(err['name']).to.be.equal('SequelizeValidationError');
      done();
    })
  })
}
