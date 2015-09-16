var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;

var Pod = require('../pod/pod.jsx');
var Profile = require('../profile/profile.jsx');

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Pod}></Route>
    <Route path="/profile" handler={Profile}></Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});

module.exports = App;
