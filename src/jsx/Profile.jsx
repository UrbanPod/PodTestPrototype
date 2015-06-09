var Profile = React.createClass({

  componentDidMount: function() {
    console.log($('#profile'));

    $("#time-picker-start").timepicker();
    $("#time-picker-end").timepicker();
  },

  render: function() {
    console.log("Am I even here?");

    return (
      <div id="profile">
        <ul>
          <li>Tell us about yourself!
            <div contentEditable="true"></div>
          </li>
          <li>Why are you interested to live with _____ people?
            <div contentEditable="true"></div>
          </li>

          <li>How clean do you maintain your space?
            <br/><input id="slider-clean" type="range" min="100" max="500" step="10" />
          </li>
          <li>Noise?
            <br/><input id="slider-noise" type="range" min="100" max="500" step="10" />
          </li>
          <li>Pets?
            <input type="radio" value="yes">yes</input>
            <input type="radio" value="no">no</input>
          </li>
          <li>Email address?
            <div contentEditable="true"></div>
          </li>
          <li>Sleep Schedule?
            <input id="time-picker-start"></input>
            <input id="time-picker-end"></input>
          </li>
        </ul>

        <button>Save</button>

      </div>
    );
  }
});

module.exports = Profile;
