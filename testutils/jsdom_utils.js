// Configuring JSDOM
var jsdom = require("jsdom");
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// Extracting component
var fs = require('fs');
React = require("react/addons");
ReactTools = require("react-tools");
TestUtils = React.addons.TestUtils;

// Compiling jsx files
var origJs = require.extensions['.js'];
require.extensions['.js'] = function(module, filename) {
  // optimization: external code never needs compilation.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});
  return module._compile(compiled, filename);
};

var find = function(component, name) {
  var comp = TestUtils.findRenderedDOMComponentWithTag(component, name);
  return comp.getDOMNode();
}

module.exports = function(test) {
  afterEach(function(done) {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    done();
  })
  test(TestUtils.renderIntoDocument, find);
}
