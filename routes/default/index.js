/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.render('index/index',
            {
                pageTitle: 'Index'
            });
    });

router.route('/about')
    .get(function (req, res) {
        res.render('index/about',
            {
                pageTitle: 'About'
            });
    });

module.exports = router;
