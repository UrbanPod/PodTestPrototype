var Router = window.ReactRouter;
var Route = window.ReactRouter.Route;

var App = require('../jsx/App.jsx');
var Pod = require('../jsx/Pod.jsx'); 
var Profile = require('../jsx/Profile.jsx'); 

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Pod}></Route>
    <Route path="/profile" handler={Profile}></Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
