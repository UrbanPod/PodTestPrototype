var MessageList = require('../message_list/message_list.jsx');
var MessageForm = require('../message_form/message_form.jsx');

var ChatBox = React.createClass({
  displayName: 'ChatBox',

  getInitialState: function() {
    POD_SOCKET.on('send:message', this.messageRecieve);

    return {users: [], clientUserName: '', messages:[], text: ''};
  },

  messageRecieve: function(message){
    var _this = this;
    var _messages = _this.state.messages;

    _messages.push(message);

    this.setState({ messages : _messages });
  },

  handleMessageSubmit: function(message){
    var _this = this;
    var _messages = _this.state.messages;

    _messages.push(message);

    this.setState({ messages : _messages });
    POD_SOCKET.emit('send:message', message);
  },

  componentWillMount: function(){
    // Prompt for the username.
    var _this = this;
    _this.state.clientUserName = window.prompt('Username?');

    // TODO: Check to see if username exists.
    // First step would be to look in the localStorage.
    console.log(_this.state.clientUserName);

    this.setState(_this.state);
  },

  render: function() {
    return (
      <div id='chat-box'>
        <MessageList messages={this.state.messages} />
        <MessageForm
          clientUserName={this.state.clientUserName}
          onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});

module.exports = ChatBox;
