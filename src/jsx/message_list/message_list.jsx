var Message = require("../message/message.jsx");

var $messageList;

var MessageList = React.createClass({
  displayName: "MessageList",

  componentDidMount: function() {
    var _this = this;

    $messageList = $('.message-list');

    $GlobalEvents.on('message_list:scroll', function() {
      _this._scrollToBottom();
    });
  },

  _scrollToBottom: function() {
    $messageList.animate({scrollTop: $messageList[0].scrollHeight}, 'slow');
  },

  render: function() {

    var renderMessage = function(message){
      return <Message
        timestamp = {message.timestamp}
        user= {message.user}
        text={message.text} />
    }

    return (
      <div className='message-list'>
        { this.props.messages.map(renderMessage)}
      </div>
    );
  }
});

module.exports = MessageList;
