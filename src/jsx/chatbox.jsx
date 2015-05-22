var Message = React.createClass({
  render: function() {

  }
});

var MessageList = React.createClass({
  render: function() {

  }
});

var MessageForm = React.createClass({
  render: function() {

  }
});

var ChatBox = React.createClass({
  
  getInitialState: function() {
    console.log("I am here.");
    return null;
  },

  render: function() {
    return (
      <div id="chat-box">
        Hello world! I am a chatbox!
      </div>
    );
  }

});

module.exports = ChatBox;
