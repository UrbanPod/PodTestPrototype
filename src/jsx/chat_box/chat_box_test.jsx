/** @jsx React.DOM */
var ChatBox = require("./chat_box.jsx");

// Mock.
// var message = {
//   timestamp: 10,
//   user: "mocked",
//   text: "mocked text"
// };

// var message_html = "[10] mocked: mocked text";

module.exports = function(render, find, utils) {
  beforeEach("Render and locate element", function(done) {
    var rendered = render( <ChatBox /> );
    this.div = find(rendered, "div");
    done();
  });

  it('<div> should have className -> messages', function() {
    expect(this.div.getAttribute('class')).to.be.equal("message");
  });
}
