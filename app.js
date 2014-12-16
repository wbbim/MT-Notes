
var path    = require('path');
var logger  = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var express = require('express');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');

var config_env  = require('./conf/config_env').conf;


// ------------- CONFIG -------------

var app = express();

app.set('config', config_env.config);
app.set('port', process.env.PORT || config_env.config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('MT.NODE_'));
app.use(session({
    name: 'MT.Name',
    secret: 'MT.Secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 600000),
        httpOnly: true
    }
}));


// ------------- RESOURCES -------------

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/apps', express.static(path.join(__dirname, 'apps')));
app.use(favicon(__dirname + '/public/favicon.ico'));


// ------------- ROUTERS -------------

// Default
var docs = require('./routes/default/docs');
var index = require('./routes/default/index');
var users = require('./routes/default/users');
var videos = require('./routes/default/videos');

app.use('/', index);
app.use(/^\/doc\w{0,1}/, docs);
app.use('/users', users);
app.use('/videos', videos);

// Api
//var api   = require('./routes/api/api');
//app.use('/api',api);


// ------------- ERROR HANDLER -------------

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (config_env.config.DEV) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
