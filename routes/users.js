var express = require('express');
var router = express.Router();

/* GET users listing. */

router.route('/')
    .get(function (req, res) {
        res.redirect('/users/login');
    });

router.route('/login')
    .get(function (req, res) {
        res.render('users/login', {
            pageTitle: 'Login',
            pageName: 'users-login',
            errorInfo: {
                flag: false
            }
        });
    })
    .post(function (req, res) {
        console.log(req.body);

        if (req.body.userMail == 'thonatos' && req.body.userPass == 'vzhibo') {
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
    });

module.exports = router;
