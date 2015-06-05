var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;

var Pod = require('../jsx/Pod.jsx'); 
var Profile = require('../jsx/Profile.jsx'); 

var routes = (
  <Route handler={Pod} path="/">
    <Route path="/profile" handler={Profile} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
