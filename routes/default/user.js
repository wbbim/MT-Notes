/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var blogController = require('../../controller/blogController').blogController;

module.exports = function (passport) {

    router.route('/')
        .get(function (req, res) {
            res.redirect('/user/signin');
        });

    router.route('/signin')
        .get(function (req, res) {
            res.render('user/signin', {
                pageTitle: 'Signin',
                message: req.flash('signInMessage')
            });
        })
        .post(passport.authenticate('local-signin', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signin',
            failureFlash: true
        }));

    router.route('/signup')
        .get(function (req, res) {
            res.render('user/signup', {
                pageTitle: 'Signup',
                pageName: 'user-signup',
                message: req.flash('signUpMessage')
            });

        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/user/profile',
            failureRedirect: '/user/signup',
            failureFlash: true

        }));

    router.route('/signout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    router.route('/admin')
        .get(isAdministrator, function (req, res) {
            res.render('user/admin', {
                pageTitle: 'Admin'
            });
        });

    router.route('/profile')
        .get(isSignedIn, function (req, res) {

            res.render('user/profile', {
                pageTitle: 'Profile',
                pageContent:{
                    'isAdministrator': function () {
                        return (req.user.local.role === 'administrator');
                    }
                }
            });
        });

    // Add Post
    router.route('/post')
        .post(blogController.add);

    // REV OR DEL
    router.route('/post/:pid')
        .put(blogController.put)
        .delete(blogController.del);


    // PRIVATE FUNC
    function isSignedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/user/signin');
    }

    function isAdministrator(req, res, next) {

        if (req.isAuthenticated() && (req.user.local.role === 'administrator')) {

            return next();
        }
        res.redirect('/user/signin');
    }

    return router;
};
