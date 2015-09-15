// Testing Dependencies
expect = require("chai").expect;
should = require("chai").should;
require('dotenv').load();

// Sequelize mocking
seq_test = require("./test_utils/seq_utils").seq_test;
models = require("./test_utils/seq_utils").models;

// Jsdom mocking
jsdom_test = require("./test_utils/jsdom_utils");

// Tests
describe("Sequelize Model Unittests", seq_test(function () {
  require("./models/tests/test_user")(models);
  require("./models/tests/test_interest")(models);
}));

describe("React Component Unittests", function () {
  jsdom_test(require("./src/jsx/message/message_test.jsx"));
});
