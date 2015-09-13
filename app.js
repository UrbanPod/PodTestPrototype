// Dependencies.
var express = require("express");
var path = require("path");

var routes = require("./routes");
var middleware = require("./middleware");

// Configurations
var PORT = process.env.PORT || 3000;

// Setting static content
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// Adding middleware
middleware(app);

// Setting up server and socket connection
var http = require("http").Server(app);
var io = require("socket.io")(http);
io.sockets.on("connection", require("./routes/socket"));
http.listen(PORT, "0.0.0.0");

// Setup Database
models = require('./models/db')(require('sequelize')(
  process.env.PGDB_NAME || "pod",
  process.env.PGDB_USERNAME || "pod",
  process.env.PGDB_PASSWORD || "pod", {
    'dialect': 'postgres'
  }
));
