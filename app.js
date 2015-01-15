var fs = require('fs');
var path = require('path');

var morgan = require('morgan');
var favicon = require('serve-favicon');
var session = require('express-session');
var express = require('express');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// ------------- CONFIG -------------

var app = express();

var APP_RUNENV = {};
var APP_SECURE = {};

var CONFIG_SITE = {};

var MT_NOTES = {

    getConf: function () {

        // READ CONF
        var _configApp = require('./conf/config_app');

        if (fs.existsSync('config_local.json')) {

            var _configLocal = JSON.parse(fs.readFileSync('config_local.json', 'utf-8'));

            console.log('## MT-NOTES: APP, Find Private Config File, Use the Config.');
            CONFIG_SITE = _configLocal.site;

            APP_RUNENV = _configLocal.runEnv;
            APP_SECURE = _configLocal.secure;

        } else {

            console.log('## MT-NOTES: APP, Cant Find Private Config File, Use default Config.');
            CONFIG_SITE = _configApp.site;

            APP_RUNENV = _configApp.runEnv;
            APP_SECURE = _configApp.secure;
        }

        if (!_configApp) {
            console.log('## MT-NOTES: Cant Read Configure Json File.');
            return false;
        }

        return true;
    },

    setConf: function () {

        var obj = {};
        var _protected = {};

        obj.init = function () {

            _protected.setLocals();
            _protected.setAPP();
            _protected.setAuth();
            _protected.setDatabase();
            _protected.setResources();
            _protected.setRouters();
            _protected.setErrors();
        };

        _protected.setLocals = function () {

            app.set('site', CONFIG_SITE);
            app.set('config', APP_RUNENV);
            app.set('administrator',APP_SECURE.administrator);

        };

        _protected.setAPP = function () {

            app.set('port', process.env.PORT || APP_RUNENV.PORT);
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'ejs');

            app.use(morgan('tiny'));
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());

        };

        _protected.setAuth = function () {

            require('./service/authService')(app,passport);

            app.use(cookieParser(APP_SECURE.cookie.name));
            app.use(session({
                name: APP_SECURE.session.name,
                secret: APP_SECURE.session.secret,
                resave: false,
                saveUninitialized: true,
                cookie: {
                    expires: new Date(Date.now() + 600000),
                    httpOnly: true
                }
            }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(flash());

        };

        _protected.setDatabase = function () {
            // MONGOOSE FOR OUR API

            var db_url     = APP_SECURE.database.url;
            var db_options = APP_SECURE.database.options;

            mongoose.connect(db_url, db_options);

            var db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                console.log('## MT-NOTES: Database initialized with Mongoose.');
            });
        };

        _protected.setResources = function () {

            // ------------- RESOURCES -------------

            app.use('/public', express.static(path.join(__dirname, 'public')));
            app.use('/apps', express.static(path.join(__dirname, 'apps')));
            app.use(favicon(__dirname + '/public/favicon.ico'));

        };

        _protected.setRouters = function () {

            // ------------- ROUTERS -------------

            require('./routes/route')(app, passport);
        };


        _protected.setErrors = function () {

            // ------------- ERROR HANDLER -------------

            if (APP_RUNENV.DEV) {

                // development error handler
                app.use(function (req, res) {
                    var err = new Error('Not Found');
                    res.status(404);
                    res.render('404', {
                        message: err.message,
                        status: err.status,
                        stack: err.stack
                    });
                });
                app.use(function (err, req, res, next) {
                    res.status(err.status || 500);
                    res.render('500', {
                        message: err.message,
                        error: err
                    });
                });

            } else {

                // production error handler
                app.use(function (req, res) {
                    var err = new Error('Not Found');
                    err.status(404);
                    res.render('404', {
                        message: err.message,
                        status: err.status,
                        stack: ''
                    });
                });
                app.use(function (err, req, res, next) {
                    res.status(err.status || 500);
                    res.render('500', {
                        message: err.message,
                        error: {}
                    });
                });
            }


        };

        return obj;

    },

    init: function () {
        this.setConf().init();
    }
};

if (MT_NOTES.getConf()) {
    MT_NOTES.init();
}

module.exports = app;
