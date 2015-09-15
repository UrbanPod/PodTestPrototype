var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;

var App = require('../jsx/app/app.jsx');
var Pod = require('../jsx/pod/pod.jsx');
var Profile = require('../jsx/profile/profile.jsx');

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Pod}></Route>
    <Route path="/profile" handler={Profile}></Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
