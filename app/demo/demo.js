/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();
var MobileDetect = require('mobile-detect');

var demoController = require('./demoController').demoController;

router.route('/')
    .get(function (req, res) {
        res.render('demo/index', {
            pageTitle: 'Demo'
        });
    });

router.route('/html-video')
    .get(demoController.htmlVideo);

router.route('/update-browser')
    .get(demoController.updateBrowser);

router.route('/touch-event')
    .get(function (req, res) {

        var mobileDetect = new MobileDetect(req.headers['user-agent'], 768);

        if (mobileDetect.mobile()) {

            if (mobileDetect.tablet() && !mobileDetect.is('AndroidOS')) {
                res.render('demo/touch-event', {
                    pageTitle: 'Touch Event'
                });
            } else {
                res.render('demo/touch-event-mobile', {
                    pageTitle: 'Touch Event'
                });
            }

        } else {
            // Desktop
            res.render('demo/touch-event', {
                pageTitle: 'Touch Event'
            });
        }


    });

module.exports = router;