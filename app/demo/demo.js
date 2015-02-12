/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();

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

router.route('/bullet-time')
    .get(function (req, res) {
        res.render('demo/bullet-time', {
            pageTitle: 'BulletTime'
        });
    });

module.exports = router;