var Multiple = require("../multiple/multiple.jsx");
var Selectable = require("../selectable/selectable.jsx");
var SlideHightlighter = require("../slide_highlighter/slide_highlighter.jsx");

var TAGS = [
  "name", "email", "gender", // basic info
  "age", "sleep", "clean", "noise", "interaction", // living info
  "interests" // person metadata
];

var getTextItems = function getTextItems(tag, items) {
  return {
    tag: tag,
    items: items.map(function(item) {
      return {
        "textData": item,
        "value": item
      };
    })
  };
}

var getImageItems = function getImageItems(tag, items) {
  return {
    tag: tag,
    items: items.map(function(item) {
      return {
        "imageLink": "images/" + item + ".png",
        "value": item,
        "width": "150px",
        "height": "150px"
      };
    })
  };
}

var TIMES = Array(11).join(0).split(0).map(function(v, i) {
  return i + 1;
});

var timeLineData = {
  "tag": "sleep",
  "start": "NOON",
  "middle": "MIDNIGHT",
  "end": "NOON",
  "rangeOne": TIMES,
  "rangeTwo": TIMES,
  "getValue": function (time, isOne) {
    if (time === "NOON") { time = "12"; }
    if (time === "MIDNIGHT") { time = "0"; }
    if (isOne) {
      time = (parseInt(time) + 12).toString();
    }
    return time;
  }
};

var Profile = React.createClass({
  getInitialState: function() {
    var state = {}
    TAGS.forEach(function(tag) {
      state[tag] = null;
    });

    return state;
  },
  formUpdated: function(tag, data) {
    var state = this.state;
    state[tag] = data;
    this.setState(state);
  },
  submit: function() {
    var state = this.state;

    state["name"] = $("#name").val();
    state["email"] = $("#email").val();
    state["gender"] = $("#gender").val();
    state["interests"] = $("#interests").val();

    console.log(state);
    this.setState(state);
  },
  render: function() {
    var doneSelector = {
      tag: "done",
      selected: this.submit,
      textData: "DONE",
      style: {
        "marginLeft": "60px"
      }
    };

    return (
      <div className="form-container">
        <div className="form">
          <h1>
            Hello! Nice to meet you</h1>
          <div>We are a group of [engineers] looking to house together. We enjoy [working on projects together], and we are looking for people to join us!</div>
          <p className="title">We would love to learn a little more about you.</p>
          <input id="name" placeholder="Name" type="text"></input>
          <input id="email" placeholder="Email" type="text"></input>
          <input id="gender" placeholder="Gender" type="text"></input>
          <hr></hr>
          <p className="title">Around how old are you?</p>
          <Multiple data={getTextItems("age", [
            "20", "30", "40"
          ])} updated={this.formUpdated}/>
          <hr></hr>
          <p className="title">When are you usually asleep?</p>
          <SlideHightlighter data={timeLineData} updated={this.formUpdated}/>
          <hr></hr>
          <p className="title">How clean do you like it?</p>
          <Multiple data={getImageItems("clean", [
            "clean", "medium", "messy"
          ])} updated={this.formUpdated}/>
          <hr></hr>
          <p className="title">
            What is your comfortable noise level?</p>
          <Multiple data={getImageItems("noise", [
            "library", "cafe", "party"
          ])} updated={this.formUpdated}/>
          <hr></hr>
          <p className="title">What is your preferred amount of interaction with house mates?</p>
          <Multiple data={getTextItems("interaction", [
            "Like Strangers", "Hangout Sometimes", "Everything Together"
          ])} updated={this.formUpdated}/>
          <hr></hr>
          <p className="title">What are you interested in? Why house with us?</p>
          <textarea id="interests"></textarea>
          <hr></hr>
          <div className="align-left">
            <p className="title">Thanks for taking the time. Talk to you soon!</p>
            <Selectable data={doneSelector}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
