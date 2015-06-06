(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RouteHandler = window.ReactRouter.RouteHandler;

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement(RouteHandler, null)
    );
  }
});

module.exports = App;

},{}],2:[function(require,module,exports){
var socket = io();

var MessageList = require("./MessageList.jsx");
var MessageForm = require("./MessageForm.jsx");

var ChatBox = React.createClass({
  displayName: "ChatBox",

  getInitialState: function() {
    socket.on('send:message', this.messageRecieve);

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
    socket.emit('send:message', message);
  },

  componentWillMount: function(){
    // Prompt for the username.
    var _this = this;
    _this.state.clientUserName = window.prompt("Username?");

    // TODO: Check to see if username exists.
    // First step would be to look in the localStorage.
    console.log(_this.state.clientUserName);

    this.setState(_this.state);
  },

  render: function() {
    return (
      React.createElement("div", {id: "chat-box"}, 
        React.createElement(MessageList, {messages: this.state.messages}), 
        React.createElement(MessageForm, {
          clientUserName: this.state.clientUserName, 
          onMessageSubmit: this.handleMessageSubmit})
      )
    );
  }
});

module.exports = ChatBox;

},{"./MessageForm.jsx":4,"./MessageList.jsx":5}],3:[function(require,module,exports){
var Message = React.createClass({
  displayName: "Message",
  render: function() {
    // Time module.
    // TODO: Refactor into its own method.
    var today = new Date().getTime();

    return (
      React.createElement("div", {className: "message"}, 
        "[", this.props.timestamp, "] ", this.props.user, ": ", this.props.text
      )
    );
  }
});

module.exports = Message;

},{}],4:[function(require,module,exports){
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

    var _this = this;
    var $contentEditable = $('#message-form-input');
    var content = this.br2nl($contentEditable.html());
    // var content = $contentEditable.html();

    currentTimestamp = new Date().getTime();

    var message = {
      timestamp: currentTimestamp,
      user: _this.props.clientUserName,
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

},{}],5:[function(require,module,exports){
var Message = require("./Message.jsx");

var MessageList = React.createClass({
  displayName: "MessageList",
  render: function() {
    
    var renderMessage = function(message){
      return React.createElement(Message, {
        timestamp: message.timestamp, 
        user: message.user, 
        text: message.text})
    }

    return (
      React.createElement("div", {className: "messages"}, 
         this.props.messages.map(renderMessage)
      )
    );
  }
});

module.exports = MessageList;

},{"./Message.jsx":3}],6:[function(require,module,exports){
var LocationBox = React.createClass({displayName: "LocationBox",
  render: function() {
    return (
      React.createElement("div", {id: "location-box"})
    );
  }
});

module.exports = LocationBox;

},{}],7:[function(require,module,exports){
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

},{"./ChatBox/ChatBox.jsx":2,"./LocationBox.jsx":6,"./Progress.jsx":9}],8:[function(require,module,exports){
var Profile = React.createClass({displayName: "Profile",
  render: function() {
    console.log("Am I even here?");

    return (
      React.createElement("div", {id: "profile"}, 
        "Sup."
      )
    );
  }
});

module.exports = Profile;

},{}],9:[function(require,module,exports){
var Progress = React.createClass({displayName: "Progress",
  render: function() {
    return (
      React.createElement("div", {id: "progress-box"}
      )
    );
  }
});

module.exports = Progress;

},{}],10:[function(require,module,exports){
var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;

var App = require('../jsx/App.jsx');
var Pod = require('../jsx/Pod.jsx'); 
var Profile = require('../jsx/Profile.jsx'); 

var routes = (
  React.createElement(Route, {handler: App}, 
    React.createElement(Route, {path: "/", handler: Pod}), 
    React.createElement(Route, {path: "/profile", handler: Profile})
  )
);

Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('content'));
});

},{"../jsx/App.jsx":1,"../jsx/Pod.jsx":7,"../jsx/Profile.jsx":8}]},{},[10]);
