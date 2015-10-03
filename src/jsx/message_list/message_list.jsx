var Message = require("../message/message.jsx");

var $messageList;
var $messageListPadding;

var MessageList = React.createClass({
  displayName: "MessageList",

  componentDidMount: function() {
    var _this = this;
    $messageList = $('.message-list');
    $messageListPadding =
      Number($messageList.css("padding").replace(/[^-\d\.]/g, ''));

    $GlobalEvents.on('message_list:scroll', function(ev, perspective) {
      _this._scrollByPerspective(perspective);
    });
  },

  componentWillUnmount: function() {
    $GlobalEvents.off('message_list:scroll');
  },

  _scrollByPerspective: function(perspective) {
    var _this = this;

    // Calcuate height to prevent scroll only if last message is not visible.
    var lastMessageHeight = $messageList.children().last().outerHeight(true);
    var margin = $messageList[0].scrollHeight
      - $messageList.scrollTop() - $messageList.outerHeight()
      - $messageListPadding - lastMessageHeight;

    console.log(margin);
    console.log(lastMessageHeight);
    console.log(margin > lastMessageHeight);
    if (perspective === 'other' && (margin > lastMessageHeight)) { return; }
    _this._scrollToBottom();
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
