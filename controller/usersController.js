/**
 * Created by thonatos on 14/12/12.
 */

var encrypt = require('../utils/encrypt');
//var Token = require('../../models/token');

var routerHandler = {

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
        console.log(req.body);

        if (req.body.userMail == 'thonatos' && req.body.userPass == 'vzhibo') {
            var token = encrypt.sha1('thonatos');
            res.send('Welcome Back! Master'+token);
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
    }

};

exports.usersController = routerHandler;