var Profile = React.createClass({

  componentDidMount: function() {
    $("#time-picker-start").timepicker();
    $("#time-picker-end").timepicker();
  },

  saveProfile: function() {

    var username = $("li > div#username").text();
    var about = $("#about").html();
    var email = $("#email").html();
    var interests = $("#interests").html();
    var cleanliness = $("#slider-clean").val();
    var noise = $("#slider-noise").val();
    var pets = $("input[name=pets]:checked").val();
    var sleepStart = $("#time-picker-start").val();
    var sleepEnd = $("#time-picker-end").val();

    var profile = {
      username: username,
      about: about,
      email: email,
      interests: interests,
      cleanliness: cleanliness,
      noise: noise,
      pets: pets,
      sleepStart: sleepStart,
      sleepEnd: sleepEnd
    }

    console.log(profile);

    $.post("/profile", profile).done(function(data) {
      console.log("Post successful: " + data);
    });

  },

  render: function() {
    console.log("Am I even here?");

    return (
      <div id="profile">
        <ul>
          <li>Username?
            <div id="username" contentEditable="true"></div>
          </li>
          <li>Tell us about yourself!
            <div id="about" contentEditable="true"></div>
          </li>
          <li>Why are you interested to live with _____ people?
            <div id="interests" contentEditable="true"></div>
          </li>

          <li>How clean do you maintain your space?
            <br/><input id="slider-clean" type="range" min="100" max="500" step="10" />
          </li>
          <li>Noise?
            <br/><input id="slider-noise" type="range" min="100" max="500" step="10" />
          </li>
          <li>Pets?
            <input type="radio" name="pets" value="yes">yes</input>
            <input type="radio" name="pets" value="no">no</input>
          </li>
          <li>Email address?
            <div id="email" contentEditable="true"></div>
          </li>
          <li>Sleep Schedule?
            <input id="time-picker-start"></input>
            <input id="time-picker-end"></input>
          </li>
        </ul>

        <button onClick={this.saveProfile}>Save</button>

      </div>
    );
  }
});

module.exports = Profile;
