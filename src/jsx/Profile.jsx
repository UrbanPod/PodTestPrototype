var Profile = React.createClass({
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
            <div contentEditable="true"></div>
          </li>
          <li>Noise?
            <div contentEditable="true"></div>
          </li>
          <li>Pets?
            <div contentEditable="true"></div>
          </li>
          <li>Email address?
            <div contentEditable="true"></div>
          </li>
          <li>Sleep Schedule?
            <div contentEditable="true"></div>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Profile;
