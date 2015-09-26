var MultipleChoiceForm = require('../triple_form/triple_form.jsx');

var mouseDown;

// Handle user interactions
window.onload = function() {
  $(document).mouseup(function() {
    mouseDown = false;
  });

  $(".time").mousedown(function() {
    $(this).toggleClass("time-active");
    mouseDown = true;
    return false;
  }).mouseover(function() {
    if (mouseDown) {
      $(this).toggleClass("time-active");
    }
  }).bind("selectstart", function() {
    return false;
  });

  $(".age-box").click(function() {
    $(".age-box").removeClass("age-active");
    $(this).addClass("age-active");
  });

  $(".interaction-box").click(function() {
    $(".interaction-box").removeClass("interaction-active");
    $(this).addClass("interaction-active");
  });

  $(".clean-box").click(function() {
    $(".clean-box").removeClass("clean-active");
    $(this).addClass("clean-active");
  });

  $(".noise-box").click(function() {
    $(".noise-box").removeClass("noise-active");
    $(this).addClass("noise-active");
  });
};

// Utility for grabbing times
var getTime = function getTime() {
  var time = $(this).text();
  if (time === "NOON") {
    time = "12";
  }
  if (time === "MIDNIGHT") {
    time = "0";
  }
  if ($(this).hasClass("pm")) {
    time = (parseInt(time) + 12).toString();
  }
  return time;
}

var getId = function getId(elem) {
  if (elem) {
    return elem.id;
  }
}

var Profile = React.createClass({
  submit: function() {
    var data = {
      name: $("#name").val(),
      email: $("#email").val(),
      gender: $("#gender").val(),
      age: $(".age-active").text(),
      sleep: $(".time-active").map(getTime),
      clean: getId($(".clean-active")[0]),
      noise: getId($(".noise-active")[0]),
      interaction: $(".interaction-active").text(),
      interests: $("#interests").val()
    };
    console.log(data);
  },

  render: function() {
    return (

// HTML ************************************************************************
<div className="form-container">
  <div className="form">
    <h1>Hello, nice to meet you!</h1>
    <div>
      We are a group of [engineers] looking to house together.  We enjoy
      [working on projects together], and we are looking for people to
      join us!
    </div>
    <p className="title">We would love to learn a little more about you.</p>
    <input id="name" placeholder="Name" type="text"></input>
    <input id="email" placeholder="Email" type="text"></input>
    <input id="gender" placeholder="Gender" type="text"></input>
    <hr></hr>
    <p className="title">Around how old are you?</p>
    <MultipleChoiceForm />
    <hr></hr>
    <p className="title">When are you usually asleep?</p>
    <div className="timeline">
      <div className="no-border time label">NOON</div>
      {Array.apply(1, Array(11)).map(function (v, i) {
        return (
          <div className="time pm">{i + 1}</div>
        )
      })}
      <div className="time label">MIDNIGHT</div>
      {Array.apply(1, Array(11)).map(function (v, i) {
        return (
          <div className="time am">{i + 1}</div>
        )
      })}
      <div className="time label">NOON</div>
    </div>
    <hr></hr>
    <p className="title">How clean do you like it?</p>
    <MultipleChoiceForm />
    <hr></hr>
    <p className="title"> What is your comfortable noise level?</p>
    <MultipleChoiceForm />
    <hr></hr>
    <p className="title">What is your preferred amount of interaction with house mates?</p>
    <MultipleChoiceForm />
    <hr></hr>
    <p className="title">What are you interested in? Why house with us?</p>
    <textarea id="interests"></textarea>
    <hr></hr>
    <div className="triple-form align-left">
      <p className="title">Thanks for taking the time. Talk to you soon!</p>
      <div className="submit spaced" onClick={this.submit}>DONE</div>
    </div>
  </div>
</div>
);}});

module.exports = Profile;
