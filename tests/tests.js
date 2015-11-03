// Testing dependencies.
expect = require("chai").expect;
should = require("chai").should;
require('dotenv').load();

// Sequelize mocking.
var seq_test = require("./utils/seq_utils").seq_test;
var models = require("./utils/seq_utils").models;

// Jsdom mocking.
jsdom_test = require("./utils/jsdom_utils");

// HELPERS *********************************************************************
var importSeqTest = function(path) {
  describe(path, function() {
    require(path)(models);
  });
}

var importReactTest = function(path) {
  describe(path, function() {
    jsdom_test(require(path));
  });
}

// TESTS ***********************************************************************
describe("Sequelize Model Unit Tests", seq_test(function () {
  importSeqTest("../models/tests/test_user");
  importSeqTest("../models/tests/test_interest");
}));

describe("React Component Unit Tests", function () {
  importReactTest("../src/jsx/chat_box/chat_box_test.jsx");
  importReactTest("../src/jsx/message/message_test.jsx");
});
