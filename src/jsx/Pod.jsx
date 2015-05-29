var LocationBox = require('./LocationBox.jsx'); 
var Progress = require('./Progress.jsx'); 
var ChatBox = require('./ChatBox/ChatBox.jsx'); 


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
