var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  process.env.PG_DB_TEST,
  process.env.PG_USER,
  process.env.PG_PASSWORD, {
    dialect: "postgres",
    logging: false
  });

var models = require('../models/db')(sequelize);

// Sequelize Mocking
var seq_test = function (next) {
  return function () {
    beforeEach(function (done) {
      sequelize.sync({
        force: true
      }).then(function () {
        done();
      });
    });

    afterEach(function (done) {
      sequelize.drop().then(function () {
        done();
      });
    });

    next();
  };
}

module.exports = {
  seq_test: seq_test,
  models: models
}
