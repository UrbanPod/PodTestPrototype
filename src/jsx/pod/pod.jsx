var LocationBox = require('../location_box/location_box.jsx');
var Progress = require('../progress/progress.jsx');
var ChatBox = require('../chat_box/chat_box.jsx');

var Pod = React.createClass({
  render: function() {
    return (
      <div id="pod-app">
        <LocationBox />
        <div id="progress-chatbox-wrapper">
          <Progress />
          <ChatBox />
        </div>
      </div>
    );
  }
});

module.exports = Pod;
