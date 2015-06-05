var Message = React.createClass({
  displayName: "Message",
  render: function() {
    // Time module.
    // TODO: Refactor into its own method.
    var today = new Date().getTime();

    return (
      <div className="message">
        [{this.props.timestamp}] {this.props.user}: {this.props.text}        
      </div>
    );
  }
});

module.exports = Message;
