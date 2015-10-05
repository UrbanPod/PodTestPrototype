/** @jsx React.DOM */
var Message = require("./message.jsx");

// Mock.
var message = {
  timestamp: 10,
  user: "mocked",
  text: "mocked text"
};

var message_html = "[10] mocked: mocked text";

module.exports = function(render, find, utils) {
  beforeEach("Render and locate element", function(done) {
    var rendered = render(
      <Message
        text={message.text}
        timestamp={message.timestamp}
        user={message.user}/>
    );

    this.div = find(rendered, "div");
    console.log('Hello world!');
    done();
  });

  it('<div> should have className -> messages', function() {
    expect(this.div.getAttribute('class')).to.be.equal("message");
  });

  it('<div> should have timestamp, user, and text in html', function() {
    expect(this.div.textContent).to.be.equal(message_html);
  });
}
