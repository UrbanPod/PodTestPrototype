// Dependencies.
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");

var app = express();
var http = require("http").Server(app);

// Made global intentionally for other files to access.
var io = require("socket.io")(http);
var socket = require("./routes/socket");

var profile = require("./routes/profile");

//Set up mongolab and PORTS to work locally and on Heroku.
var mongoURI = process.env.MONGOURI_POD || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "secret", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, "public")));

// Routing.
// app.get("/profile", profile.);

io.sockets.on("connection", socket);

// Start server.
http.listen(PORT, "0.0.0.0");
