var Message = require("./Message.jsx");

var MessageList = React.createClass({
  displayName: "MessageList",
  render: function() {
    
    var renderMessage = function(message){
      return <Message 
        timestamp = {message.timestamp}
        user= {message.user} 
        text={message.text} />
    }

    return (
      <div className='messages'>
        { this.props.messages.map(renderMessage)}
      </div>
    );
  }
});

module.exports = MessageList;
