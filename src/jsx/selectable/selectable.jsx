var Selectable = React.createClass({
  handleClick: function(e) {
    if (this.props.data.selected) {
      this.props.data.selected("box", this.props.data.value);
    }
    $(e.target).toggleClass("box-active");
  },
  render: function() {
    var boxStyle = this.props.data.style || {};

    boxStyle["backgroundImage"] = this.props.data.imageLink
        ? "url(" + this.props.data.imageLink + ")"
        : this.props.data.bgColor || "none";
    boxStyle["width"] = this.props.data.width || "auto",
    boxStyle["height"] = this.props.data.height || "auto"


    var className = "box " + this.props.data.tag;
    return (
      <div className={className} onClick={this.handleClick} style={boxStyle}>{this.props.data.textData}</div>
    );
  }
});

module.exports = Selectable;
