// Dependencies.
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Set up mongolab and PORTS to work locally and on Heroku.
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

//API Authentication Routes

// Our Routes.
// GET.
app.get('/', function(req, res){
  res.send("Hello world!");
});

io.on('connection', function(socket){
  console.log('a user connected');
});

// POST.

http.listen(3000, '0.0.0.0', function(){
  console.log('listening on *:3000');
});
