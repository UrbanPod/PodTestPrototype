(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      React.createElement("div", {id: "chat-box"}, 
        React.createElement(MessageList, {messages: this.state.messages}), 
        React.createElement(MessageForm, {onMessageSubmit: this.handleMessageSubmit})
      )
    );
  }
});

module.exports = ChatBox;

},{"./MessageForm.jsx":3,"./MessageList.jsx":4}],2:[function(require,module,exports){
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

module.exports = Message;

},{}],3:[function(require,module,exports){
var MessageForm = React.createClass({
  displayName: "MessageForm",

  br2nl: function(str) {
    return str.replace(/<br\s*\/?>/mg,"\n");
  },

  handleKeyPress: function(e) {
    // Submit form on Enter. Shift+Enter provides a newline.
    if(e.key === "Enter" && !e.shiftKey) {
      this.handleSubmit(e);
    }
  },

  handleSubmit : function(e) {
    e.preventDefault();

    var $contentEditable = $('#message-form-input');
    var content = this.br2nl($contentEditable.html());
    // var content = $contentEditable.html();

    var message = {
      text: content
    }
    
    this.props.onMessageSubmit(message); 
    $contentEditable.html('');    
  },

  render: function(){
    return(
      React.createElement("div", {className: "message-form"}, 
        React.createElement("div", {
          id: "message-form-input", 
          contentEditable: "true", 
          onKeyPress: this.handleKeyPress})
      )
    );
  }
});

module.exports = MessageForm;

},{}],4:[function(require,module,exports){
var Message = require("./Message.jsx");

var MessageList = React.createClass({
  displayName: "MessageList",
  render: function() {
    
    var renderMessage = function(message){
      return React.createElement(Message, {text: message.text})
    }

    return (
      React.createElement("div", {className: "messages"}, 
         this.props.messages.map(renderMessage)
      )
    );
  }
});

module.exports = MessageList;

},{"./Message.jsx":2}],5:[function(require,module,exports){
var LocationBox = React.createClass({displayName: "LocationBox",
  render: function() {
    return (
      React.createElement("div", {id: "location-box"})
    );
  }
});

module.exports = LocationBox;

},{}],6:[function(require,module,exports){
var LocationBox = require('./LocationBox.jsx'); 
var Progress = require('./Progress.jsx'); 
var ChatBox = require('./ChatBox/ChatBox.jsx'); 


var Pod = React.createClass({displayName: "Pod",
  render: function() {
    return (
      React.createElement("div", {id: "pod-app"}, 
        React.createElement(LocationBox, null), 
        React.createElement("div", {id: "progress-chatbox-wrapper"}, 
          React.createElement(Progress, null), 
          React.createElement(ChatBox, null)
        )
      )
    );
  }
});

module.exports = Pod;

},{"./ChatBox/ChatBox.jsx":1,"./LocationBox.jsx":5,"./Progress.jsx":7}],7:[function(require,module,exports){
var Progress = React.createClass({displayName: "Progress",
  render: function() {
    return (
      React.createElement("div", {id: "progress-box"}
      )
    );
  }
});

module.exports = Progress;

},{}],8:[function(require,module,exports){
var Pod = require('../jsx/Pod.jsx'); 
React.render(React.createElement(Pod, null), document.getElementById('content'));

},{"../jsx/Pod.jsx":6}]},{},[8]);
