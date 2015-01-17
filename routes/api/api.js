var express = require('express');
var router = express.Router();

var blogController = require('../../controller/blogController').blogController;

// Return Json
router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to @TF.ME!'
        });
    });

router.route('/posts/page/:currentPage')
    .get(blogController.getAll);

router.route('/posts/:pid')
    .get(blogController.get);

module.exports = router;
