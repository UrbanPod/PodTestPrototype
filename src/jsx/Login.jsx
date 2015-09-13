var Login = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();

    // TODO: send request to the server
    var username = React.findDOMNode(this.refs.author).value.trim();
    var password = React.findDOMNode(this.refs.text).value.trim();

    var login = {
      username: username,
      password: password
    }

    console.log(login);

    $.post("/login", login).done(function(data) {
      console.log("Post successful: " + data);
      // window.location = "/#/";
    });

  },

  render: function() {
    return (
      <form id="login" onSubmit={this.handleSubmit}>
        Username: 
        <input type="text" ref="username"/>
        Password: 
        <input type="text" ref="password"/>
        <input type="button" value="Login"></input>
      </form>
    );
  }
});

module.exports = Login;
