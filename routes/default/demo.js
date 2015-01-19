/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();

var demoController = require('../../controller/demoController').demoController;

router.route('/')
    .get(function (req, res) {
        res.render('demo/index', {
            pageTitle: 'Demo'
        });
    });

router.route('/video-live')
    .get(demoController.videolive);

router.route('/update-browser')
    .get(demoController.updateBrowser);

module.exports = router;