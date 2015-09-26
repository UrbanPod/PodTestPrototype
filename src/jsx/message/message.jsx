var Message = React.createClass({
  displayName: "Message",

  componentDidMount: function() {
    var _this = this;
  },

  // TODO:Missing unit test.
  _getRelativeTimeDisplay: function(unixTime) {
    var formattedTimeDiff = moment(unixTime).format('MMM Do h:mm a');
    return formattedTimeDiff;
  },

  render: function() {
    var _this = this;
    var formattedTimeDiff = _this._getRelativeTimeDisplay(this.props.timestamp);

    return (
      <div className="message">
        <div>
          {this.props.user}: {this.props.text}
        </div>
        <span className="timestamp">{formattedTimeDiff}</span>
      </div>
    );
  }
});

module.exports = Message;
