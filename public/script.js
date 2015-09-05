(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.fbAsyncInit = function() {
  FB.init({
    appId      : '369784996554321',
    xfbml      : true,
    version    : 'v2.3'
  });
};

// (
//   function(d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk')
// );

module.exports = null;

},{}],2:[function(require,module,exports){
var RouteHandler = window.ReactRouter.RouteHandler;

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement(RouteHandler, null)
    );
  }
});

module.exports = App;

},{}],3:[function(require,module,exports){
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

},{"./MessageForm.jsx":5,"./MessageList.jsx":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./Message.jsx":4}],7:[function(require,module,exports){
var LocationBox = React.createClass({displayName: "LocationBox",
  render: function() {
    return (
      React.createElement("div", {id: "location-box"})
    );
  }
});

module.exports = LocationBox;

},{}],8:[function(require,module,exports){
var Login = React.createClass({displayName: "Login",

  handleSubmit: function(e) {
    e.preventDefault();

    // TODO: send request to the server
    var username = React.findDOMNode(this.refs.author).value.trim();
    var password = React.findDOMNode(this.refs.text).value.trim();

    var login = {
      username: username,
      password: password
    }

    console.log(login);

    $.post("/login", login).done(function(data) {
      console.log("Post successful: " + data);
      // window.location = "/#/";
    });

  },

  render: function() {
    return (
      React.createElement("form", {id: "login", onSubmit: this.handleSubmit}, 
        "Username:",  
        React.createElement("input", {type: "text", ref: "username"}), 
        "Password:",  
        React.createElement("input", {type: "text", ref: "password"}), 
        React.createElement("input", {type: "button", value: "Login"})
      )
    );
  }
});

module.exports = Login;

},{}],9:[function(require,module,exports){
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

},{"./ChatBox/ChatBox.jsx":3,"./LocationBox.jsx":7,"./Progress.jsx":11}],10:[function(require,module,exports){
var Router = window.ReactRouter;

var Profile = React.createClass({displayName: "Profile",

  mixins: [Router],

  componentDidMount: function() {
    $("#time-picker-start").timepicker();
    $("#time-picker-end").timepicker();
  },

  saveProfile: function() {

    var _this = this;

    var username = $("li > div#username").text();
    var about = $("#about").html();
    var email = $("#email").html();
    var interests = $("#interests").html();
    var cleanliness = $("#slider-clean").val();
    var noise = $("#slider-noise").val();
    var pets = $("input[name=pets]:checked").val();
    var sleepStart = $("#time-picker-start").val();
    var sleepEnd = $("#time-picker-end").val();

    var profile = {
      username: username,
      about: about,
      email: email,
      interests: interests,
      cleanliness: cleanliness,
      noise: noise,
      pets: pets,
      sleepStart: sleepStart,
      sleepEnd: sleepEnd
    }

    console.log(profile);

    $.post("/profile", profile).done(function(data) {
      console.log("Post successful: " + data);
      window.location = "/#/";
    });

  },

  render: function() {
    console.log("Am I even here?");

    return (
      React.createElement("div", {id: "profile"}, 
        React.createElement("ul", null, 
          React.createElement("li", null, "Username?", 
            React.createElement("div", {id: "username", contentEditable: "true"})
          ), 
          React.createElement("li", null, "Tell us about yourself!", 
            React.createElement("div", {id: "about", contentEditable: "true"})
          ), 
          React.createElement("li", null, "Why are you interested to live with _____ people?", 
            React.createElement("div", {id: "interests", contentEditable: "true"})
          ), 

          React.createElement("li", null, "How clean do you maintain your space?", 
            React.createElement("br", null), React.createElement("input", {id: "slider-clean", type: "range", min: "100", max: "500", step: "10"})
          ), 
          React.createElement("li", null, "Noise?", 
            React.createElement("br", null), React.createElement("input", {id: "slider-noise", type: "range", min: "100", max: "500", step: "10"})
          ), 
          React.createElement("li", null, "Pets?", 
            React.createElement("input", {type: "radio", name: "pets", value: "yes"}, "yes"), 
            React.createElement("input", {type: "radio", name: "pets", value: "no"}, "no")
          ), 
          React.createElement("li", null, "Email address?", 
            React.createElement("div", {id: "email", contentEditable: "true"})
          ), 
          React.createElement("li", null, "Sleep Schedule?", 
            React.createElement("input", {id: "time-picker-start"}), 
            React.createElement("input", {id: "time-picker-end"})
          )
        ), 

        React.createElement("button", {onClick: this.saveProfile}, "Save")

      )
    );
  }
});

module.exports = Profile;

},{}],11:[function(require,module,exports){
var Progress = React.createClass({displayName: "Progress",
  render: function() {
    return (
      React.createElement("div", {id: "progress-box"}
      )
    );
  }
});

module.exports = Progress;

},{}],12:[function(require,module,exports){
var facebookSDK = require('./facebookSDK.js');

var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;

var App = require('../jsx/App.jsx');
var Login = require('../jsx/Login.jsx'); 
var Pod = require('../jsx/Pod.jsx'); 
var Profile = require('../jsx/Profile.jsx'); 

var routes = (
  React.createElement(Route, {handler: App}, 
    React.createElement(Route, {path: "/", handler: Pod}), 
    React.createElement(Route, {path: "/profile", handler: Profile}), 
    React.createElement(Route, {path: "/login", handler: Login})
  )
);

Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('content'));
});

},{"../jsx/App.jsx":2,"../jsx/Login.jsx":8,"../jsx/Pod.jsx":9,"../jsx/Profile.jsx":10,"./facebookSDK.js":1}]},{},[12]);
