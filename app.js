

// PACKAGES FOR OUR API
// =============================================================================
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var envConf     = require('./conf/env').conf;

// CONFIGURE FOR OUR API
// =============================================================================
var app = express();

app.set('local',envConf.local);
app.set('debug',envConf.debug);
app.set('env',envConf.env());
app.set('port', process.env.PORT || 8084);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// RESOURCES FOR OUR API
// =============================================================================

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/apps',express.static(path.join(__dirname, 'apps')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// ROUTES FOR OUR API
// =============================================================================

//var api   = require('./routes/api/api');
var docs  = require('./routes/default/docs');
var index = require('./routes/default/index');
var users = require('./routes/default/users');

app.use('/', index);
//app.use('/api',api);
app.use(/^\/doc\w{0,1}/,docs);
app.use('/users', users);

// ERROR HANDLER FOR OUR API
// =============================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
