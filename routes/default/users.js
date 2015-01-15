/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var postsController = require('../../controller/postsController').postsController;


module.exports = function (passport) {

    router.route('/')
        .get(function (req, res) {
            res.redirect('/users/signin');
        });

    router.route('/signin')
        .get(function (req, res) {
            res.render('users/signin', {
                pageTitle: 'Signin',
                pageName: 'users-signin',
                message: req.flash('signInMessage')
            });
        })
        .post(passport.authenticate('local-signin', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/signin',
            failureFlash: true
        }));

    router.route('/signup')
        .get(function (req, res) {
            res.render('users/signup', {
                pageTitle: 'Signup',
                pageName: 'users-signup',
                message: req.flash('signUpMessage')
            });

        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/users/profile',
            failureRedirect: '/users/signup',
            failureFlash: true

        }));

    router.route('/signout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    router.route('/admin')
        .get(isAdministrator, function (req, res) {
            res.render('users/admin', {
                pageTitle: 'Admin',
                pageName: 'users-admin'
            });
        });

    router.route('/profile')
        .get(isSignedIn, function (req, res) {
            console.log(req.user);

        });

    // Add Post
    router.route('/post')
        .post(postsController.add);

    // REV OR DEL
    router.route('/post/:pid')
        .put(postsController.put)
        .delete(postsController.del);

    function isSignedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/users/signin');
    }


    function isAdministrator(req, res, next) {

        if (req.isAuthenticated() && (req.user.local.role === 'administrator')) {

            return next();
        }

        res.redirect('/users/signin');
    }

    return router;
};
