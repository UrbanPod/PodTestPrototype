var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;
var RouteHandler = window.ReactRouter.RouteHandler;

var Pod = require('../pod/pod.jsx');
var Profile = require('../profile/profile.jsx');
var Registered = require('../registered/registered.jsx');

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
    <Route path="/signup" handler={Profile}></Route>
    <Route path="/registered" handler={Registered}></Route>
  </Route>
);

var router = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});

module.exports = router;
