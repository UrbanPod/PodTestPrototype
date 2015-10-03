var MessageForm = React.createClass({
  displayName: "MessageForm",

  br2nl: function(str) {
    return str.replace(/<br\s*\/?>/mg,"\n");
  },

  handleKeyPress: function(e) {
    // Submit form on Enter. Shift+Enter provides a newline.
    if(e.key === "Enter" && !e.shiftKey) {
      $GlobalEvents.trigger('message_list:scroll', ['myself']);
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
      <div className='message-form'>
        <div
          id="message-form-input"
          contentEditable="true"
          onKeyPress={this.handleKeyPress}></div>
      </div>
    );
  }
});

module.exports = MessageForm;
