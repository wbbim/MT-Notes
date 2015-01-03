var fs      = require('fs');
var path    = require('path');
var logger  = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var express = require('express');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');

// ------------- CONFIG -------------

var app = express();

var CONFIG_RUN_ENV  = {};
var CONFIG_SECURE   = {};
var CONFIG_SITE= {};

var MtNotes = {

    getConf: function () {

        // READ CONF
        var _conf = require('./conf/config').conf;

        if(!_conf){
            console.log('Cant Read Configure Json File.');
            return false;
        }

        CONFIG_RUN_ENV  = _conf.runEnv;
        CONFIG_SECURE   = _conf.secure;
        CONFIG_SITE   = _conf.site;

        return true;
    },

    setConf: function () {

        var obj = {};
        var _protected = {};

        obj.init = function () {

            _protected.setLocals();
            _protected.setAPP();
            _protected.setResources();
            _protected.setRouters();
            _protected.setErrors();
        };

        _protected.setLocals = function () {

            app.set('site',CONFIG_SITE);
            app.set('config', CONFIG_RUN_ENV);

        };

        _protected.setAPP = function () {

            app.set('port', process.env.PORT || CONFIG_RUN_ENV.PORT);
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'ejs');

            app.use(logger('dev'));
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

            app.use(cookieParser(CONFIG_SECURE.cookie.name));
            app.use(session({
                name: CONFIG_SECURE.session.name,
                secret: CONFIG_SECURE.session.secret,
                resave: false,
                saveUninitialized: true,
                cookie: {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                }
            }));

        };

        _protected.setResources = function () {

            // ------------- RESOURCES -------------

            app.use('/public', express.static(path.join(__dirname, 'public')));
            app.use('/apps', express.static(path.join(__dirname, 'apps')));
            app.use(favicon(__dirname + '/public/favicon.ico'));

        };

        _protected.setRouters = function () {

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
        };


        _protected.setErrors = function () {
            // ------------- ERROR HANDLER -------------

            app.use(function (req, res, next) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });

            // development error handler
            if (CONFIG_RUN_ENV.DEV) {
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
        };

        return obj;

    },

    init: function () {
        this.setConf().init();
    }
};

if( MtNotes.getConf() ){
    MtNotes.init();
}

module.exports = app;
