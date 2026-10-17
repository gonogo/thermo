var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');
var temp = require('temperature');

/*
fs.watch('/home/pi/thermo/public/images/webcam.jpg', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
    if (filename) {
	    console.log(`filename provided: ${filename}`);
		  } else {
	 console.log('filename not provided');
    }
});
*/

fs.watchFile('/home/pi/thermo/public/images/webcam.jpg', webcamUpdated);

function webcamUpdated (event, filename) {
	// Should we check to make sure socket.io has loaded first?
	io.emit('webcamUpdated', {file: filename});	
	console.log('webcamUpdated');
}

function pollTemperature () {
	console.log(temp.temperature);
	io.emit('msgTemperature', { temp: temp.temperature });
};
io.on('connection', function(socket) {
	setInterval(pollTemperature, 1000);
	console.log('a user connected');
});
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var raw = require('./routes/temp-raw');

//var temp = require('temperature');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/raw', raw);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
