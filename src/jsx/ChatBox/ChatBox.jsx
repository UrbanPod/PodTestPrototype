var socket = io();

var MessageList = require("./MessageList.jsx");
var MessageForm = require("./MessageForm.jsx");

var ChatBox = React.createClass({
  displayName: "ChatBox",

  getInitialState: function() {
    socket.on('send:message', this.messageRecieve);

    return {users: [], messages:[], text: ''};
  },

  messageRecieve: function(message){
    var _this = this;
    var _messages = _this.state.messages;
    
    _messages.push(message);

    this.setState({ messages : _messages });
  },

  handleMessageSubmit : function(message){
    var _this = this;
    var _messages = _this.state.messages;
    
    _messages.push(message);
    
    this.setState({ messages : _messages });
    socket.emit('send:message', message);
  },

  render: function() {
    return (
      <div id="chat-box">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});

module.exports = ChatBox;
