var express = require('express');
var path = require('path');
var fs = require('fs')
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost/spider1'
var http = require('http')
mongoose.connect(dbUrl)
// models loading
var models_path = __dirname + '/models'
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath)
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath)
            }
        })
}
walk(models_path)



// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public

app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


var index= require('./routes/index')
app.use('/',index)
// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/
// error handlers

// development error handler
// will print stacktrace

/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

*/

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

*/

var port = process.env.PORT || '3000'
// var port=Math.round((1+Math.random())*1000)
app.set('port', port);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

module.exports = app;
