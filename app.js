// Dependencies.
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require("express-session");

var app = express();
var http = require("http").Server(app);

// Made global intentionally for other files to access.
var io = require("socket.io")(http);
var socket = require("./routes/socket");

var profile = require("./routes/profile");
var login = require("./routes/login");

// Set up mongolab and PORTS to work locally and on Heroku.
var mongoURI = process.env.MONGOURI_POD || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;


// TODO: Essential, but I'm not sure what they do.
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });


// Use the Facebook strategy for passport.
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "secret", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Routing.
app.post("/login", passport.authenticate('local'), login.basic);
app.get("/profile", profile.testRoute);
app.get("/login", login.basic);

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope : 'email' }));

app.post("/profile", profile.saveProfile);

io.sockets.on("connection", socket);

// Start server.
http.listen(PORT, "0.0.0.0");
