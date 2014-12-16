/**
 * Created by thonatos on 14/12/12.
 */

var authService = require('../service/authService').authService;

exports.usersController = {

    loginAll: function (req, res, next) {
        authService.verAuth(req, res, next);
    },

    loginGet: function (req, res) {

        res.render('users/login', {
            pageTitle: 'Login',
            pageName: 'users-login',
            errorInfo: {
                flag: false
            }
        });

    },

    loginPost: function (req, res) {

        var _userMail = req.body.userMail;
        var _userPass = req.body.userPass;
        var _options = {expires: new Date(Date.now() + 600000), httpOnly: true};

        if ('thonatos' === _userMail && 'vzhibo' === _userPass) {

            var _auth = authService.setAuth(_userMail,_userPass);

            req.session.auth = _auth;
            res.cookie('userEmail', _auth.userEmail, _options);
            res.cookie('userToken', _auth.userToken, _options);

            res.send('Welcome Back! Master');
        } else {
            res.render('users/login', {
                pageTitle: 'Login',
                pageName: 'users-login',
                errorInfo: {
                    flag: true,
                    msg: 'Login failed! Try Again,'
                }
            });
        }
    },

    logoutGet: function (req, res) {

        req.session.destroy();
        res.cookies.destroy();

    },

    adminGet: function(req,res){
        res.render('users/admin', {
            pageTitle: 'Admin',
            pageName: 'users-admin'
        });
    }

};