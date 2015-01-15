/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var postsController = require('../../controller/postsController').postsController;


module.exports = function (passport) {

    router.route('/')
        .get(function (req, res) {
            res.redirect('/users/login');
        });

    router.route('/login')
        .get(function (req, res) {
            res.render('users/login', {
                pageTitle: 'Login',
                pageName: 'users-login',
                message: req.flash('loginMessage')
            });


        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/users/admin',
            failureRedirect: '/users/login',
            failureFlash: true

        }));

    router.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    router.route('/signup')
        .get(function (req, res) {
            res.render('users/signup', {
                pageTitle: 'Signup',
                pageName: 'users-signup',
                message: req.flash('signupMessage')
            });

        })
        //.post(passport.authenticate('local-signup', {
        //    successRedirect: '/users/admin',
        //    failureRedirect: '/users/signup',
        //    failureFlash: true
        //
        //}));
        .post(function (req, res) {
            res.send('Register Closed.');
        });

    router.route('/admin')
        .get(isLoggedIn, function (req, res) {
            res.render('users/admin', {
                pageTitle: 'Admin',
                pageName: 'users-admin'
            });
        });

    // Add Post
    router.route('/post')
        .post(postsController.add);

    // REV OR DEL
    router.route('/post/:pid')
        .put(postsController.put)
        .delete(postsController.del);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/users/login');
    }

    return router;
};
