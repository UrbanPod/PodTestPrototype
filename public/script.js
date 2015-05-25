(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();
var Messages = [];

var Message = React.createClass({
  displayName: "Message",
  render: function() {
    return (
      React.createElement("div", {className: "message"}, 
        this.props.text
      )
    );
  }
});

var MessageList = React.createClass({
  displayName: "MessageList",
  render: function() {
    
    var renderMessage = function(message){
      return React.createElement(Message, {text: message.text})
    }

    return (
      React.createElement("div", {className: "messages"}, 
        React.createElement("h2", null, " Conversation: "), 
         this.props.messages.map(renderMessage)
      )
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
      React.createElement("div", {className: "message-form"}, 
        React.createElement("h3", null, "Write New Message"), 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {onChange: this.changeHandler, value: this.state.text})
        )
      )
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
    this.setState({ messages : Messages });
  },

  handleMessageSubmit : function(message){
    Messages.push(message);
    this.setState({ messages : Messages });
    socket.emit('send:message', message);
  },

  render: function() {
    return (
      React.createElement("div", {id: "chat-box"}, 
        "Hello world! I am a chatbox!", 
        React.createElement(MessageList, {messages: this.state.messages}), 
        React.createElement(MessageForm, {onMessageSubmit: this.handleMessageSubmit})
      )
    );
  }
});

module.exports = ChatBox;

},{}],2:[function(require,module,exports){
var ChatBox = require('../jsx/chatbox.jsx'); // need to specify the jsx extension

React.render(React.createElement(ChatBox, null), document.getElementById('content'));

},{"../jsx/chatbox.jsx":1}]},{},[2]);
