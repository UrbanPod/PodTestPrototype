var SlideHighlighter = React.createClass({
  getInitialState: function() {
    return {
      "mouseDown": false,
      "selected": null
    };
  },
  componentDidMount: function() {
    var _this = this;
    $(document).mouseup(function() {
      var state = _this.state;
      state["selected"] = $(".time-active").get().map(_this.getTime);
      state["mouseDown"] = false;
      _this.props.updated(_this.props.data.tag, state["selected"]);
      _this.setState(state);
    });

    $(".time").mousedown(function() {
      $(this).toggleClass("time-active");
      var state = _this.state;
      state["mouseDown"] = true;
      _this.setState(state);
      return false;
    }).mouseover(function() {
      if (_this.state["mouseDown"]) {
        $(this).toggleClass("time-active");
      }
    }).bind("selectstart", function() {
      return false;
    });
  },
  getTime: function (each) {
    var time = $(each).text();
    var isOne = $(each).hasClass("one");
    return this.props.data.getValue(time, isOne);
  },
  render: function() {
    return (
      <div className="timeline">
        <div className="no-border time label">{this.props.data.start}</div>
        {this.props.data.rangeOne.map(function (v) {
          return (
            <div className="time one">{v}</div>
          );
        })}
        <div className="time label">{this.props.data.middle}</div>
        {this.props.data.rangeTwo.map(function (v) {
          return (
            <div className="time two">{v}</div>
          );
        })}
        <div className="time label">{this.props.data.end}</div>
      </div>
    );
  }
});

<<<<<<< HEAD
module.exports = SlideHighlighter;
=======
module.exports = SlideHighliter;
>>>>>>> c0a24381a57bfbd8678ef0426ca732550457dbf1
