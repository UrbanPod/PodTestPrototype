var Message = require("../message/message.jsx");

var messageListDOM;

var MessageList = React.createClass({
  displayName: "MessageList",

  componentDidMount: function() {
    var _this = this;
    messageListDOM = document.getElementById("message-list-chat");
    $GlobalEvents.on('message_list:scroll', function() {
      _this._scrollToBottom();
    });
  },

  _scrollToBottom: function() {
    messageListDOM.scrollTop = messageListDOM.scrollHeight;
  },

  render: function() {

    var renderMessage = function(message){
      return <Message
        timestamp = {message.timestamp}
        user= {message.user}
        text={message.text} />
    }

    return (
      <div className='message-list' id='message-list-chat'>
        { this.props.messages.map(renderMessage)}
      </div>
    );
  }
});

module.exports = MessageList;
