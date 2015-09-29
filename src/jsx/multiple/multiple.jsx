var Selectable = require("../selectable/selectable.jsx");

var Multiple = React.createClass({
  getInitialState: function() {
    return {
      "selected": null
    };
  },
  select: function(className, data) {
// Remove active for other items in Multiple
    $("." + this.props.data.tag).removeClass(className + "-active");
// Update parent with data
    this.props.updated(this.props.data.tag, data);

// Set the data
    var state = this.state;
    state.selected = data;
    this.setState(state);
  },
  render: function() {
    var _this = this;
    var selectables = this.props.data.items.map(function(data) {
      data["selected"] = _this.select;
      data["tag"] = _this.props.data.tag;
      return (
        <Selectable data={data}/>
      );
    });
    return (
      <div className="multiple">
        {selectables}
      </div>
    );
  }
});

module.exports = Multiple;
