// Testing Dependencies
expect = require("chai").expect;
should = require("chai").should;

var Sequelize = require('sequelize');
var sequelize = new Sequelize("podbase", "admin", null, {
    dialect: "postgres",
    logging: function() { return undefined; }
});

var models = require('./models/db')(sequelize);

var seq_test = function (next) {
  return function () {
    beforeEach(function (done) {
        sequelize.sync({ force: true }).then(function() {
            done();
        });
    });

    afterEach(function (done) {
        sequelize.drop().then(function() {
            done();
        });
    });

    next();
  };
}

describe("Model Unittests", seq_test(function () {
  require("./models/tests/test_user.js")(models);
  require("./models/tests/test_interest.js")(models);
}));
