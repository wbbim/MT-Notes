var express = require('express');
var router = express.Router();

var blogController = require('../blog/blogController').blogController;

router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to NOTES@MT!'
        });
    });

router.route('/blog/page/:currentPage')
    .get(blogController.getAll);

router.route('/blog/post/:pid')
    .get(blogController.get);

module.exports = router;
