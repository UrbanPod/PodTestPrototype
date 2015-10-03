var Message = React.createClass({
  displayName: "Message",

  componentDidMount: function() {
    var _this = this;

    // TODO: Cache our username and check rather than hardwire this in.
    if (this.props.user !== 'me') {
      $GlobalEvents.trigger('message_list:scroll', ['other']);
    }
  },

  // TODO:Missing unit test.
  _getRelativeTimeDisplay: function(unixTime) {
    var formattedTimeDiff = moment(unixTime).format('MMM Do h:mm a');
    return formattedTimeDiff;
  },

  render: function() {
    var _this = this;
    var formattedTimeDiff = _this
      ._getRelativeTimeDisplay(_this.props.timestamp);

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
