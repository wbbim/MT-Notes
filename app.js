
// PACKAGES FOR OUR API
// =============================================================================
var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var favicon     = require('serve-favicon');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var envConf     = require('./conf/env').conf;

// CONFIGURE FOR OUR API
// =============================================================================
var app = express();

app.set('config',envConf.config);
app.set('port', process.env.PORT || envConf.config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('MT.NODE_'));
app.use(session({
    secret: 'MT NODE',
    resave: false,
    saveUninitialized: true
}));

// RESOURCES FOR OUR API
// =============================================================================

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/apps',express.static(path.join(__dirname, 'apps')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// ROUTES FOR OUR API
// =============================================================================

// Default
var docs  = require('./routes/default/docs');
var index = require('./routes/default/index');
var users = require('./routes/default/users');

app.use('/', index);
app.use(/^\/doc\w{0,1}/,docs);
app.use('/users', users);

// Api
//var api   = require('./routes/api/api');
//app.use('/api',api);

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
if (envConf.config.ENV() === 'development') {
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
