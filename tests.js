var MONGO_TEST_URI = "mongodb://localhost/test";
expect = require("chai").expect;
should = require("chai").should;

var mongo_test = function(next) {
  return function() {
    var mongoose = require("mongoose");
    var con = mongoose.connect(MONGO_TEST_URI);

    before(function(done) {
      mongoose.connection.on("open", function() {
        con.connection.db.dropDatabase(done);
      });
    });

    after(function(done) {
      con.connection.close(done);
    });

    afterEach(function(done) {
      con.connection.db.dropDatabase(done);
    });

    next();
  };
}

describe("Model Unittests", mongo_test(function() {
  require("./models/tests/test_user.js")();
}));
