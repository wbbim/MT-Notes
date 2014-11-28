var express = require('express');
var router = express.Router();


/* GET home page. */
router.route('/')
    .get(function (req, res) {
        res.render('index/index',
            {
                pageTitle: 'Index',
                msg: 'V逼格',
                pageName:'index-index'
            });
    });

module.exports = router;
