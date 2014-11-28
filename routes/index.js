var express = require('express');
var router = express.Router();


/* GET home page. */
router.route('/')
    .get(function (req, res) {
        res.render('index/index',
            {
                title: 'Index',
                msg: 'V逼格',
                tmpl:'index-index'
            });
    });

module.exports = router;
