var express = require('express');
var router = express.Router();


/* GET home page. */
router.route('/')
    .get(function (req, res) {
        res.render('index/index',
            {
                pageTitle: 'Index',
                pageName: 'index-index'
            });
    });

router.route('/about')
    .get(function (req, res) {
        res.render('index/about',
            {
                pageTitle: 'About',
                pageName: 'index-about'
            });
    });

module.exports = router;
