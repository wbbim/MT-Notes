/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();

var demoController = require('../../controller/demoController').demoController;

router.route('/')
    .get(function (req, res) {
        res.send('Demo Page');
    });

router.route('/live')
    .get(demoController.live);
module.exports = router;