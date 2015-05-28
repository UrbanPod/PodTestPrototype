"use strict";

var socket = io();
var Messages = [];

var Message = React.createClass({
  displayName: "Message",
  render: function() {
    return (
      <div className="message">
        {this.props.text}        
      </div>
    );
  }
});

var MessageList = React.createClass({
  displayName: "MessageList",
  render: function() {
    
    var renderMessage = function(message){
      return <Message text={message.text} />
    }

    return (
      <div className='messages'>
        <h2> Conversation: </h2>
        { this.props.messages.map(renderMessage)}
      </div>
    );
  }
});

var MessageForm = React.createClass({
  displayName: "MessageForm",

  getInitialState: function(){
    return {text: ''};
  },

  handleSubmit : function(e){
    e.preventDefault();
    var message = {
      text : this.state.text
    }
    this.props.onMessageSubmit(message); 
    this.setState({ text: '' });
  },

  changeHandler : function(e){
    this.setState({ text : e.target.value });
  },

  render: function(){
    return(
      <div className='message-form'>
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.changeHandler} value={this.state.text} />
        </form>
      </div>
    );
  }
});

var ChatBox = React.createClass({

  displayName: "ChatBox",

  getInitialState: function() {
    socket.on('init', this.initialize);
    socket.on('send:message', this.messageRecieve);

    return {users: [], messages:[], text: ''};
  },

  messageRecieve: function(message){
    Messages.push(message);

    var _this = this;
    console.log(_this.messages);
    this.setState({ messages : Messages });
  },

  handleMessageSubmit : function(message){
    var _this = this;
    console.log(_this);

    Messages.push(message);
    this.setState({ messages : Messages });
    socket.emit('send:message', message);
  },

  render: function() {
    return (
      <div id="chat-box">
        Hello world! I am a chatbox!
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});

module.exports = ChatBox;
